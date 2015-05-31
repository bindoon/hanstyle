<?php 
define("TOKEN", "hanstyle");

$wechatObj = new wechatCallbackapiTest();
if (!isset($_GET['echostr'])) {
    $wechatObj->responseMsg();
}else{
    $wechatObj->valid();
}

class wechatCallbackapiTest
{
    //验证签名
    public function valid()
    {
        $echoStr = $_GET["echostr"];
        $signature = $_GET["signature"];
        $timestamp = $_GET["timestamp"];
        $nonce = $_GET["nonce"];
        $token = TOKEN;
        $tmpArr = array($token, $timestamp, $nonce);
        sort($tmpArr);
        $tmpStr = implode($tmpArr);
        $tmpStr = sha1($tmpStr);
        if($tmpStr == $signature){
            echo $echoStr;
            exit;
        }
    }

    public function responseMsg()
    {
        $postStr = $GLOBALS["HTTP_RAW_POST_DATA"];
        if (!empty($postStr)){
            $this->logger("R ".$postStr);
            $postObj = simplexml_load_string($postStr, 'SimpleXMLElement', LIBXML_NOCDATA);
            $RX_TYPE = trim($postObj->MsgType);

            $result = "";
            switch ($RX_TYPE)
            {
                case "event":
                    $result = $this->receiveEvent($postObj);
                    break;
                case "text":
                    $result = $this->receiveText($postObj);
                    break;
            }
            $this->logger("T ".$result);
            echo $result;
        }else {
            echo "";
            exit;
        }
    }

    private function receiveText($object)
    {
        $keyword = trim($object->Content);
        $url = "http://apix.sinaapp.com/weather/?appkey=".$object->ToUserName."&city=".urlencode($keyword); 
        $output = file_get_contents($url);
        $content = json_decode($output, true);

        $result = $this->transmitNews($object, $content);
        return $result;
    }

    private function receiveEvent($object)
    {
        switch ($object->Event)
        {
            case "subscribe":
                $contentStr = "欢迎关注汉时代!";
                break;
            case "unsubscribe":
                break;
            case "CLICK":
                switch ($object->EventKey)
                {
                    case "test":
                        $contentStr[] = array("Title" =>"公司简介", 
                        "Description" =>"简单测试", 
                        "PicUrl" =>"http://discuz.comli.com/weixin/weather/icon/cartoon.jpg", 
                        "Url" =>"weixin://addfriend/pondbaystudio");
                        break;
                    case "luckday":
                        $contentStr = "what a luck day!";
                        break;
                    default:
                        $contentStr[] = array("Title" =>"默认菜单回复", 
                        "Description" =>"其他默认", 
                        "PicUrl" =>"http://discuz.comli.com/weixin/weather/icon/cartoon.jpg", 
                        "Url" =>"weixin://addfriend/pondbaystudio");
                        break;
                }
                break;
            default:
                break;
        }
        
        if (is_array($contentStr)){
            $resultStr = $this->transmitNews($object, $contentStr);
        }else{
            $resultStr = $this->transmitText($object, $contentStr);
        }
        return $resultStr;
    }

    private function transmitText($object, $content)
    {
        if (!isset($content) || empty($content)){
            return "";
        }
        $textTpl = "<xml>
            <ToUserName><![CDATA[%s]]></ToUserName>
            <FromUserName><![CDATA[%s]]></FromUserName>
            <CreateTime>%s</CreateTime>
            <MsgType><![CDATA[text]]></MsgType>
            <Content><![CDATA[%s]]></Content>
            </xml>";
        $result = sprintf($textTpl, $object->FromUserName, $object->ToUserName, time(), $content);
        return $result;
    }



    private function transmitNews($object, $newsArray)
    {
        //首条标题28字，其他标题39字
        if(!is_array($newsArray)){
            return "";
        }
        $itemTpl = "    <item>
            <Title><![CDATA[%s]]></Title>
            <Description><![CDATA[%s]]></Description>
            <PicUrl><![CDATA[%s]]></PicUrl>
            <Url><![CDATA[%s]]></Url>
            </item>
            ";
        $item_str = "";
        foreach ($newsArray as $item){
            $item_str .= sprintf($itemTpl, $item['Title'], $item['Description'], $item['PicUrl'], $item['Url']);
        }
        $newsTpl = "<xml>
            <ToUserName><![CDATA[%s]]></ToUserName>
            <FromUserName><![CDATA[%s]]></FromUserName>
            <CreateTime>%s</CreateTime>
            <MsgType><![CDATA[news]]></MsgType>
            <Content><![CDATA[]]></Content>
            <ArticleCount>%s</ArticleCount>
            <Articles>$item_str</Articles>
            </xml>";

        $result = sprintf($newsTpl, $object->FromUserName, $object->ToUserName, time(), count($newsArray));
        return $result;
    }

    private function logger($log_content)
    {

    }
}
?>

