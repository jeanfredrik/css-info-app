set -e

npm run build

cd build
aws s3 sync . s3://css-info.com --region=eu-central-1 --delete
