access_token = "";

$jsonmenu = '
{
    "button":[
    {
        "name":"汉文化",
            "sub_button":[
            {
                "type":"click",
                "name":"测试",
                "key":"test"
            },
            {
                "type":"click",
                "name":"求签解答",
                "key":"wantanswer"
            },
            {
                "type":"view",
                "name":"本地天气",
                "url":"http://m.hao123.com/a/tianqi"
            }]
    },
    {
        "name":"汉style",
        "sub_button":[
        {
            "type":"click",
            "name":"茶道",
            "key":"tea"
        },
        {
            "type":"click",
            "name":"能量",
            "key":"energy"
        }]
    },
    {
        "name":"我",
        "sub_button":[
        {
            "type":"click",
            "name":"今日运势",
            "key":"luckday"
        },
        {
            "type":"click",
            "name":"猜你喜欢",
            "key":"guess"
        }]
    }
    ]
}
';


$url = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=".$access_token;
$result = https_request($url, $jsonmenu);
var_dump($result);

function https_request($url,$data = null){
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
    if (!empty($data)){
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
    }
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $output = curl_exec($curl);
    curl_close($curl);
    return $output;
}

function get_access_token() {

    $appid = "";
    $appsecret = "";
    $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$appid&secret=$appsecret";

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE); 
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE); 
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $output = curl_exec($ch);
    curl_close($ch);
    $jsoninfo = json_decode($output, true);
    $access_token = $jsoninfo["access_token"];

}
?>
