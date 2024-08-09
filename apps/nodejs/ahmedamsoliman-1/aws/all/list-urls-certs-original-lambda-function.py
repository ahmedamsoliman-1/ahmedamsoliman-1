import boto3
import socket

uae_region = "me-central-1"
fixed = "https://s3.me-central-1.amazonaws.com/pics.certs.ahmedalimsoliman.click/"


def lambda_handler(event, context):
    if socket.gethostname() == "AAMSThinkPadX1":
        session = boto3.Session(profile_name="r53")
        s3 = session.client("s3")
    else:
        s3 = boto3.client("s3", region_name=uae_region)


    bucket_name = "pics.certs.ahmedalimsoliman.click"
    result = s3.list_objects(Bucket=bucket_name)
    object_names = [content["Key"] for content in result.get("Contents", [])]

    object_urls = []

    for k in object_names:
        object_urls.append(
            "https://s3.me-central-1.amazonaws.com/pics.certs.ahmedalimsoliman.click/" + k
        )

    AWS_Badges = []
    AWS_Certifications = []
    AWS_Trainning = []
    Linkedin = []
    SDN = []
    HCL = []
    Percipio = []
    Others = []

    for filtered in object_names:
        if "AWS/Badges" in filtered:
            AWS_Badges.append(fixed + filtered)

        if "AWS/Certifications" in filtered:
            AWS_Certifications.append(fixed + filtered)

        if "AWS/Trainning" in filtered:
            AWS_Trainning.append(fixed + filtered)

        if "Linkedin" in filtered:
            Linkedin.append(fixed + filtered)

        if "SDN" in filtered:
            SDN.append(fixed + filtered)

        if "HCL/" in filtered:
            HCL.append(fixed + filtered)

        if "Percipio" in filtered:
            Percipio.append(fixed + filtered)

        # if "HCL" in filtered:
        #     HCL.append(fixed + filtered)

        if "Others" in filtered:
            Others.append(fixed + filtered)

    all = {
        "Badges": AWS_Badges,
        "Certifications": AWS_Certifications,
        "Trainning": AWS_Trainning,
        "Linkedin": Linkedin,
        "SDN": SDN,
        "HCL": HCL,
        "Percipio": Percipio,
        "Others": Others,
    }

    return all


if socket.gethostname() == "AAMSThinkPadX1":
    print(lambda_handler(None, None), "\n")

#   JSONdata_percipio = res.body["Percipio"];
#   JSONdata_linkedin = res.body["Linkedin"];
#   JSONdata_other = res.body["Other"];
