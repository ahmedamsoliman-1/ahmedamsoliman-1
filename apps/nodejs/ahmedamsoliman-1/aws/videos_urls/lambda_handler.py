import boto3
import socket


bucket_2 = "ahmedamsoliman-replica"

if socket.gethostname() == "AAMSThinkPadX1":
    session = boto3.Session(profile_name="aams-1-us-east-1")
    s3 = session.client("s3")
else:
    s3 = boto3.client("s3")


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
    fixed = "https://s3.amazonaws.com/ahmedamsoliman-replica/"
    _video = []
    for file in get_all_s3_objects(s3, Bucket=bucket_2, Prefix=f"IAM"):
        if "mp4" in file["Key"]:
            _video.append(fixed + file["Key"])
    years = {"video": _video}
    return years