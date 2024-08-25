const express = require("express");
const AWS = require("aws-sdk");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = 3001;

const awsConfig_r53 = {
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
};

const awsConfig_s3 = {
  accessKeyId: process.env.AAMS_S3,
  secretAccessKey: process.env.AAMS_S3_SEC,
};

const awsConfig_s3_2 = {
  accessKeyId: process.env.AAMS_S3_2,
  secretAccessKey: process.env.AAMS_S3_2_SEC,
};

const awsConfig_aams_1 = {
  accessKeyId: process.env.AAMS_1,
  secretAccessKey: process.env.AAMS_1_SEC,
};

const awsConfig_aams_2 = {
  accessKeyId: process.env.AAMS_2,
  secretAccessKey: process.env.AAMS_2_SEC,
};
const awsConfig_aams_3 = {
  accessKeyId: process.env.AAMS_3,
  secretAccessKey: process.env.AAMS_3_SEC,
};
const awsConfig_aams_4 = {
  accessKeyId: process.env.AAMS_4,
  secretAccessKey: process.env.AAMS_4_SEC,
};
const awsConfig_aams_5 = {
  accessKeyId: process.env.AAMS_5,
  secretAccessKey: process.env.AAMS_5_SEC,
};
const awsConfig_aams_mange = {
  accessKeyId: process.env.AAMS_MANGE,
  secretAccessKey: process.env.AAMS_MANGE_SEC,
};

// Create an S3 instance
const s3_r53 = new AWS.S3(awsConfig_r53);
const s3_s3 = new AWS.S3(awsConfig_s3);
const s3_s3_2 = new AWS.S3(awsConfig_s3_2);
const s3_aams_1 = new AWS.S3(awsConfig_aams_1);
const s3_aams_2 = new AWS.S3(awsConfig_aams_2);
const s3_aams_3 = new AWS.S3(awsConfig_aams_3);
const s3_aams_4 = new AWS.S3(awsConfig_aams_4);
const s3_aams_5 = new AWS.S3(awsConfig_aams_5);
const s3_aams_mange = new AWS.S3(awsConfig_aams_mange);

// Enable CORS
app.use(cors());

// Endpoint to fetch the bucket details
app.get("/buckets", async (req, res) => {
  try {
    const s3Response = await s3_r53.listBuckets().promise();
    const buckets = s3Response.Buckets;

    // Fetch additional details for each bucket
    const bucketDetailsPromises = buckets.map(async (bucket) => {
      const region = await s3_r53
        .getBucketLocation({ Bucket: bucket.Name })
        .promise();
      const websiteConfig = await s3_r53
        .getBucketWebsite({ Bucket: bucket.Name })
        .promise()
        .catch(() => null);
      const bucketLink = `https://s3.console.aws.amazon.com/s3/buckets/${bucket.Name}/`;
      const s3StaticEndpoint = `http://${bucket.Name}.s3-website.${region.LocationConstraint}.amazonaws.com`;

      return {
        Name: bucket.Name,
        Region: region.LocationConstraint || "us-east-1",
        CreationDate: bucket.CreationDate,
        WebsiteEnabled: websiteConfig && websiteConfig.RoutingRules.length > 0,
        BucketLink: bucketLink,
        S3StaticEndpoint: s3StaticEndpoint,
      };
    });

    const bucketDetails = await Promise.all(bucketDetailsPromises);
    res.json(bucketDetails);
  } catch (error) {
    console.log("Error fetching buckets:", error);
    res.status(500).json({ error: "Failed to fetch buckets" });
  }
});

app.get("/aams/r53/buckets", async (req, res) => {
  try {
    const s3Response = await s3_r53.listBuckets().promise();
    const buckets = s3Response.Buckets;

    // Fetch additional details for each bucket
    const bucketDetailsPromises = buckets.map(async (bucket) => {
      const region = await s3_r53
        .getBucketLocation({ Bucket: bucket.Name })
        .promise();
      const websiteConfig = await s3_r53
        .getBucketWebsite({ Bucket: bucket.Name })
        .promise()
        .catch(() => null);
      const bucketLink = `https://s3.console.aws.amazon.com/s3/buckets/${bucket.Name}/`;
      const s3StaticEndpoint = `http://${bucket.Name}.s3-website.${region.LocationConstraint}.amazonaws.com`;

      return {
        Name: bucket.Name,
        Region: region.LocationConstraint || "us-east-1",
        CreationDate: bucket.CreationDate,
        WebsiteEnabled: websiteConfig && websiteConfig.RoutingRules.length > 0,
        BucketLink: bucketLink,
        S3StaticEndpoint: s3StaticEndpoint,
      };
    });

    const bucketDetails = await Promise.all(bucketDetailsPromises);
    res.json(bucketDetails);
  } catch (error) {
    console.log("Error fetching buckets:", error);
    res.status(500).json({ error: "Failed to fetch buckets" });
  }
});

app.get("/aams/s3/1/buckets", async (req, res) => {
  try {
    const s3Response = await s3_s3.listBuckets().promise();
    const buckets = s3Response.Buckets;

    // Fetch additional details for each bucket
    const bucketDetailsPromises = buckets.map(async (bucket) => {
      const region = await s3_s3
        .getBucketLocation({ Bucket: bucket.Name })
        .promise();
      const websiteConfig = await s3_s3
        .getBucketWebsite({ Bucket: bucket.Name })
        .promise()
        .catch(() => null);
      const bucketLink = `https://s3.console.aws.amazon.com/s3/buckets/${bucket.Name}/`;
      const s3StaticEndpoint = `http://${bucket.Name}.s3-website.${region.LocationConstraint}.amazonaws.com`;

      return {
        Name: bucket.Name,
        Region: region.LocationConstraint || "us-east-1",
        CreationDate: bucket.CreationDate,
        WebsiteEnabled: websiteConfig && websiteConfig.RoutingRules.length > 0,
        BucketLink: bucketLink,
        S3StaticEndpoint: s3StaticEndpoint,
      };
    });

    const bucketDetails = await Promise.all(bucketDetailsPromises);
    res.json(bucketDetails);
  } catch (error) {
    console.log("Error fetching buckets:", error);
    res.status(500).json({ error: "Failed to fetch buckets" });
  }
});

app.get("/aams/s3/2/buckets", async (req, res) => {
  try {
    const s3Response = await s3_s3_2.listBuckets().promise();
    const buckets = s3Response.Buckets;

    // Fetch additional details for each bucket
    const bucketDetailsPromises = buckets.map(async (bucket) => {
      const region = await s3_s3_2
        .getBucketLocation({ Bucket: bucket.Name })
        .promise();
      const websiteConfig = await s3_s3_2
        .getBucketWebsite({ Bucket: bucket.Name })
        .promise()
        .catch(() => null);
      const bucketLink = `https://s3.console.aws.amazon.com/s3/buckets/${bucket.Name}/`;
      const s3StaticEndpoint = `http://${bucket.Name}.s3-website.${region.LocationConstraint}.amazonaws.com`;

      return {
        Name: bucket.Name,
        Region: region.LocationConstraint || "us-east-1",
        CreationDate: bucket.CreationDate,
        WebsiteEnabled: websiteConfig && websiteConfig.RoutingRules.length > 0,
        BucketLink: bucketLink,
        S3StaticEndpoint: s3StaticEndpoint,
      };
    });

    const bucketDetails = await Promise.all(bucketDetailsPromises);
    res.json(bucketDetails);
  } catch (error) {
    console.log("Error fetching buckets:", error);
    res.status(500).json({ error: "Failed to fetch buckets" });
  }
});

app.get("/aams/1/buckets", async (req, res) => {
  try {
    const s3Response = await s3_aams_1.listBuckets().promise();
    const buckets = s3Response.Buckets;

    // Fetch additional details for each bucket
    const bucketDetailsPromises = buckets.map(async (bucket) => {
      const region = await s3_aams_1
        .getBucketLocation({ Bucket: bucket.Name })
        .promise();
      const websiteConfig = await s3_aams_1
        .getBucketWebsite({ Bucket: bucket.Name })
        .promise()
        .catch(() => null);
      const bucketLink = `https://s3.console.aws.amazon.com/s3/buckets/${bucket.Name}/`;
      const s3StaticEndpoint = `http://${bucket.Name}.s3-website.${region.LocationConstraint}.amazonaws.com`;

      return {
        Name: bucket.Name,
        Region: region.LocationConstraint || "us-east-1",
        CreationDate: bucket.CreationDate,
        WebsiteEnabled: websiteConfig && websiteConfig.RoutingRules.length > 0,
        BucketLink: bucketLink,
        S3StaticEndpoint: s3StaticEndpoint,
      };
    });

    const bucketDetails = await Promise.all(bucketDetailsPromises);
    res.json(bucketDetails);
  } catch (error) {
    console.log("Error fetching buckets:", error);
    res.status(500).json({ error: "Failed to fetch buckets" });
  }
});

app.get("/aams/2/buckets", async (req, res) => {
  try {
    const s3Response = await s3_aams_2.listBuckets().promise();
    const buckets = s3Response.Buckets;

    // Fetch additional details for each bucket
    const bucketDetailsPromises = buckets.map(async (bucket) => {
      const region = await s3_aams_2
        .getBucketLocation({ Bucket: bucket.Name })
        .promise();
      const websiteConfig = await s3_aams_2
        .getBucketWebsite({ Bucket: bucket.Name })
        .promise()
        .catch(() => null);
      const bucketLink = `https://s3.console.aws.amazon.com/s3/buckets/${bucket.Name}/`;
      const s3StaticEndpoint = `http://${bucket.Name}.s3-website.${region.LocationConstraint}.amazonaws.com`;

      return {
        Name: bucket.Name,
        Region: region.LocationConstraint || "us-east-1",
        CreationDate: bucket.CreationDate,
        WebsiteEnabled: websiteConfig && websiteConfig.RoutingRules.length > 0,
        BucketLink: bucketLink,
        S3StaticEndpoint: s3StaticEndpoint,
      };
    });

    const bucketDetails = await Promise.all(bucketDetailsPromises);
    res.json(bucketDetails);
  } catch (error) {
    console.log("Error fetching buckets:", error);
    res.status(500).json({ error: "Failed to fetch buckets" });
  }
});
app.get("/aams/3/buckets", async (req, res) => {
  try {
    const s3Response = await s3_aams_3.listBuckets().promise();
    const buckets = s3Response.Buckets;

    // Fetch additional details for each bucket
    const bucketDetailsPromises = buckets.map(async (bucket) => {
      const region = await s3_aams_3
        .getBucketLocation({ Bucket: bucket.Name })
        .promise();
      const websiteConfig = await s3_aams_3
        .getBucketWebsite({ Bucket: bucket.Name })
        .promise()
        .catch(() => null);
      const bucketLink = `https://s3.console.aws.amazon.com/s3/buckets/${bucket.Name}/`;
      const s3StaticEndpoint = `http://${bucket.Name}.s3-website.${region.LocationConstraint}.amazonaws.com`;

      return {
        Name: bucket.Name,
        Region: region.LocationConstraint || "us-east-1",
        CreationDate: bucket.CreationDate,
        WebsiteEnabled: websiteConfig && websiteConfig.RoutingRules.length > 0,
        BucketLink: bucketLink,
        S3StaticEndpoint: s3StaticEndpoint,
      };
    });

    const bucketDetails = await Promise.all(bucketDetailsPromises);
    res.json(bucketDetails);
  } catch (error) {
    console.log("Error fetching buckets:", error);
    res.status(500).json({ error: "Failed to fetch buckets" });
  }
});
app.get("/aams/4/buckets", async (req, res) => {
  try {
    const s3Response = await s3_aams_4.listBuckets().promise();
    const buckets = s3Response.Buckets;

    // Fetch additional details for each bucket
    const bucketDetailsPromises = buckets.map(async (bucket) => {
      const region = await s3_aams_4
        .getBucketLocation({ Bucket: bucket.Name })
        .promise();
      const websiteConfig = await s3_aams_4
        .getBucketWebsite({ Bucket: bucket.Name })
        .promise()
        .catch(() => null);
      const bucketLink = `https://s3.console.aws.amazon.com/s3/buckets/${bucket.Name}/`;
      const s3StaticEndpoint = `http://${bucket.Name}.s3-website.${region.LocationConstraint}.amazonaws.com`;

      return {
        Name: bucket.Name,
        Region: region.LocationConstraint || "us-east-1",
        CreationDate: bucket.CreationDate,
        WebsiteEnabled: websiteConfig && websiteConfig.RoutingRules.length > 0,
        BucketLink: bucketLink,
        S3StaticEndpoint: s3StaticEndpoint,
      };
    });

    const bucketDetails = await Promise.all(bucketDetailsPromises);
    res.json(bucketDetails);
  } catch (error) {
    console.log("Error fetching buckets:", error);
    res.status(500).json({ error: "Failed to fetch buckets" });
  }
});
app.get("/aams/5/buckets", async (req, res) => {
  try {
    const s3Response = await s3_aams_5.listBuckets().promise();
    const buckets = s3Response.Buckets;

    // Fetch additional details for each bucket
    const bucketDetailsPromises = buckets.map(async (bucket) => {
      const region = await s3_aams_5
        .getBucketLocation({ Bucket: bucket.Name })
        .promise();
      const websiteConfig = await s3_aams_5
        .getBucketWebsite({ Bucket: bucket.Name })
        .promise()
        .catch(() => null);
      const bucketLink = `https://s3.console.aws.amazon.com/s3/buckets/${bucket.Name}/`;
      const s3StaticEndpoint = `http://${bucket.Name}.s3-website.${region.LocationConstraint}.amazonaws.com`;

      return {
        Name: bucket.Name,
        Region: region.LocationConstraint || "us-east-1",
        CreationDate: bucket.CreationDate,
        WebsiteEnabled: websiteConfig && websiteConfig.RoutingRules.length > 0,
        BucketLink: bucketLink,
        S3StaticEndpoint: s3StaticEndpoint,
      };
    });

    const bucketDetails = await Promise.all(bucketDetailsPromises);
    res.json(bucketDetails);
  } catch (error) {
    console.log("Error fetching buckets:", error);
    res.status(500).json({ error: "Failed to fetch buckets" });
  }
});

app.get("/aams/mange/buckets", async (req, res) => {
  try {
    const s3Response = await s3_aams_mange.listBuckets().promise();
    const buckets = s3Response.Buckets;

    // Fetch additional details for each bucket
    const bucketDetailsPromises = buckets.map(async (bucket) => {
      const region = await s3_aams_mange
        .getBucketLocation({ Bucket: bucket.Name })
        .promise();
      const websiteConfig = await s3_aams_mange
        .getBucketWebsite({ Bucket: bucket.Name })
        .promise()
        .catch(() => null);
      const bucketLink = `https://s3.console.aws.amazon.com/s3/buckets/${bucket.Name}/`;
      const s3StaticEndpoint = `http://${bucket.Name}.s3-website.${region.LocationConstraint}.amazonaws.com`;

      return {
        Name: bucket.Name,
        Region: region.LocationConstraint || "us-east-1",
        CreationDate: bucket.CreationDate,
        WebsiteEnabled: websiteConfig && websiteConfig.RoutingRules.length > 0,
        BucketLink: bucketLink,
        S3StaticEndpoint: s3StaticEndpoint,
      };
    });

    const bucketDetails = await Promise.all(bucketDetailsPromises);
    res.json(bucketDetails);
  } catch (error) {
    console.log("Error fetching buckets:", error);
    res.status(500).json({ error: "Failed to fetch buckets" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
