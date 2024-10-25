curl --request POST \
 --header 'Content-Type: application/x-www-form-urlencoded' \
 --data-urlencode 'grant_type=authorization_code' \
 --data-urlencode "client_id=eb03e678-1326-43af-af68-94fc1bfe0bfa" \
 --data-urlencode "client_secret=ta-secret.yO@bwWV%pmJUrh&h" \
 --data-urlencode "code=NA_8ccdffdeb799f2055e5d6ab6cb7678ad58c3d65d08ce4f3d07efaabbc019" \
 --data-urlencode "audience=https://fleet-api.prd.na.vn.cloud.tesla.com" \
 --data-urlencode "redirect_uri=https://c0ad-140-180-240-231.ngrok-free.app/extractToken" \
 'https://auth.tesla.com/oauth2/v3/token'

curl --request POST -H 'Content-Type: application/x-www-form-urlencoded' --data-urlencode 'grant_type=refresh_token' --data-urlencode 'client_id=eb03e678-1326-43af-af68-94fc1bfe0bfa' --data-urlencode "refresh_token=NA_4aaa26ae231b11723ca5b91b9ae890c7fdb05e5d3731a9997fadd90ca874f43b" 'https://auth.tesla.com/oauth2/v3/token'

curl -G "https://auth.tesla.com/oauth2/v3/authorize" \
 --data-urlencode "response_type=code" \
 --data-urlencode "client_id=eb03e678-1326-43af-af68-94fc1bfe0bfa" \
 --data-urlencode "redirect_uri=https://b6e7-140-180-240-231.ngrok-free.app/extractToken" \
 --data-urlencode "scope=openid offline_access vehicle_device_data vehicle_cmds vehicle_charging_cmds" \
 --data-urlencode "state=random"
