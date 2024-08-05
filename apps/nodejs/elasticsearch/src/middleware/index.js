const es_client = require('../db/elasticsearch');

const middlewares = {};

// Middleware to list Elasticsearch indices
middlewares.list_es_indices = async (req, res, next) => {
    try {
        let indices = await es_client.cat.indices({ format: 'json' });
        res.locals.indices = indices;
        next();
    } catch (error) {
        next(error);
    }
};

// Middleware to list contents of specific indices
middlewares.list_index_contents = async (req, res, next) => {
    const indicesToFetch = ['aams_steps', 'aams_threads', 'aams_users'];

    try {
        const indexContents = await Promise.all(
            indicesToFetch.map(async (index) => {
                try {
                    const response = await es_client.search({
                        index: index,
                        body: {
                            query: {
                                match_all: {} // Adjust query if needed
                            },
                            size: 10 // Increase size if needed to return more documents
                        }
                    });

                    
                    // Access hits from response directly
                    const documents = response.hits && response.hits.hits ? response.hits.hits : [];
                    return {
                        index: index,
                        documents: documents
                    };
                } catch (error) {
                    console.error(`Error fetching data for index ${index}:`, error);
                    return {
                        index: index,
                        documents: []
                    };
                }
            })
        );

        res.locals.indexContents = indexContents;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = middlewares;
