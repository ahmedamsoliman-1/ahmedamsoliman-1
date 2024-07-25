var { es_client_dev, es_client_local } = require("../db/ESConnector")

const middleware = require('../middlewares/utils')
var middlewares = {};


async function getElasticsearchInfo(which_elastic) {
  let client;
  if (which_elastic === 'local') {
    client = es_client_local;
  } else {
    client = es_client_dev;
  }
  try {
    const infoResponse = await client.info();
    const clusterName = infoResponse.cluster_name;
    const version = infoResponse.version.number;
    const aliasesResponse = await client.cat.aliases({ format: 'json' });
    const aliases = aliasesResponse.filter(alias => !alias.alias.startsWith('.'));
    return {
      clusterName,
      version,
      aliases,
    };
  } catch (error) {
    middleware.llog("Error retrieving Elasticsearch information:", error);
    return {
      m_error: 'Error retrieving Elasticsearch information',
      d_error: String(error),
    };
  }
}

middlewares.provideAliasData = async function (req, res, next) {
  const which_elastic = req.query.which_elastic;
  if (!which_elastic) {
    return res.status(400).json({ error: 'Specify Elastic to Use' }); 
  }
  const aliasData = await getElasticsearchInfo(which_elastic);
  if (!aliasData.aliases) {
      return res.render('error', {
        user: req.user,
        time: new Date(),
        pageTitle: 'Error',
        error: aliasData.m_error,
        derror: aliasData.d_error,
      });
  }

  const aliasGroups = {};
  for (const alias of aliasData.aliases) {
      if (!aliasGroups[alias.alias]) {
          aliasGroups[alias.alias] = [];
      }
      aliasGroups[alias.alias].push(alias.index);
  }

  req.aliasData = {
      clusterName: aliasData.clusterName,
      version: aliasData.version,
      aliasGroups: aliasGroups,
      
  };
  next();
};



middlewares.paginatedResults = async function (req, res, next) {
  indexName = 'cs2_games';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    try {
        const { body } = await es_client_dev.search({
            index: indexName,
            body: {
                from: startIndex,
                size: limit,
                query: {
                    match_all: {}
                }
            }
        });

        if (!body || !body.hits || !body.hits.hits) {
            res.status(500).json({ message: 'Invalid Elasticsearch response format' });
            return;
        }

        const hits = body.hits.hits;
        const results = hits.map(hit => hit._source);
        const hasMore = startIndex + results.length < body.hits.total.value;
        const nextPage = hasMore ? page + 1 : null;
        const previousPage = page > 1 ? page - 1 : null;

        res.paginatedResults = {
            results,
            nextPage,
            previousPage
        };

        next();
    } catch (err) {
        console.error('Elasticsearch error:', err);
        res.status(500).json({ message: 'Error querying Elasticsearch' });
    }
}




module.exports = middlewares;