import boto3
import socket


bucket = "ahmedamsoliman"
uae_region = "me-central-1"
us_region = "us-east-1"

access_key_parameter_name = "s3-access-key"
secret_key_parameter_name = "s3-secret-key"

if socket.gethostname() == "AAMSThinkPadX1":
    session = boto3.Session(profile_name="aams-s3-me-central-1")
    s3 = session.client("s3")
else:
    ssm_client = boto3.client("ssm")
    access_key_parameter = ssm_client.get_parameter(Name=access_key_parameter_name, WithDecryption=True)
    secret_key_parameter = ssm_client.get_parameter(Name=secret_key_parameter_name, WithDecryption=True)
    access_key = access_key_parameter["Parameter"]["Value"]
    secret_key = secret_key_parameter["Parameter"]["Value"]
    session = boto3.Session(
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        region_name=us_region
    )
    s3 = session.client("s3", region_name=uae_region)


def get_all_s3_objects(s3, **base_kwargs):
    continuation_token = None
    while True:
        list_kwargs = dict(MaxKeys=1000, **base_kwargs)
        if continuation_token:
            list_kwargs["ContinuationToken"] = continuation_token
        response = s3.list_objects_v2(**list_kwargs)
        yield from response.get("Contents", [])
        if not response.get("IsTruncated"):  # At the end of the list?
            break
        continuation_token = response.get("NextContinuationToken")


def lambda_handler(event, context):
    fixed = "https://ahmedamsoliman.thumb.s3.me-central-1.amazonaws.com/"

    _000 = []
    _2010 = []
    _2015 = []

    _2016 = []
    _2017 = []
    _2018 = []
    _2019 = []

    _2020 = []
    _2021 = []
    _2022 = []
    _2023 = []
    _2024 = []
    _gd = []
    
    for file in get_all_s3_objects(s3, Bucket=bucket, Prefix=f"Fellas/000"):
        _000.append(fixed + file["Key"])

    for file in get_all_s3_objects(s3, Bucket=bucket, Prefix=f"Fellas/2010"):
        _2010.append(fixed + file["Key"])
    for file in get_all_s3_objects(s3, Bucket=bucket, Prefix=f"Fellas/2015"):
        _2015.append(fixed + file["Key"])

    for file in get_all_s3_objects(s3, Bucket=bucket, Prefix=f"Fellas/2016"):
        _2016.append(fixed + file["Key"])
    for file in get_all_s3_objects(s3, Bucket=bucket, Prefix=f"Fellas/2017"):
        _2017.append(fixed + file["Key"])
    for file in get_all_s3_objects(s3, Bucket=bucket, Prefix=f"Fellas/2018"):
        _2018.append(fixed + file["Key"])
    for file in get_all_s3_objects(s3, Bucket=bucket, Prefix=f"Fellas/2019"):
        _2019.append(fixed + file["Key"])

    for file in get_all_s3_objects(s3, Bucket=bucket, Prefix=f"Fellas/2020"):
        _2020.append(fixed + file["Key"])
    for file in get_all_s3_objects(s3, Bucket=bucket, Prefix=f"Fellas/2021"):
        _2021.append(fixed + file["Key"])
    for file in get_all_s3_objects(s3, Bucket=bucket, Prefix=f"Fellas/2022"):
        _2022.append(fixed + file["Key"])
    for file in get_all_s3_objects(s3, Bucket=bucket, Prefix=f"Fellas/2023"):
        _2023.append(fixed + file["Key"])
    for file in get_all_s3_objects(s3, Bucket=bucket, Prefix=f"Fellas/2023"):
        _2024.append(fixed + file["Key"])
    for file in get_all_s3_objects(s3, Bucket=bucket, Prefix=f"Fellas/GD"):
        _gd.append(fixed + file["Key"])

    years = {
        "000": _000,
        "2010": _2010,
        "2015": _2015,
        "2016": _2016,
        "2017": _2017,
        "2018": _2018,
        "2019": _2019,
        "2020": _2020,
        "2021": _2021,
        "2022": _2022,
        "2023": _2023,
        "2024": _2024,
        "gd": _gd,
    }
    return years


if socket.gethostname() == "AAMSThinkPadX1":
    res = lambda_handler(None, None)
    with open("urls.json", "w") as f:
        for i in res:
            f.write(i + "\n")
            for j in res[i]:
                f.write(j + "\n")
