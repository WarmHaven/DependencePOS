<?php

namespace App;

class Jwt
{
    private $alg = 'sha256';

    private $secret = "6*Mw,+UZS]P.-F3w";

    /**
     * alg属性表示签名的算法（algorithm），默认是 HMAC SHA256（写成 HS256）；typ属性表示这个令牌（token）的类型（type），JWT 令牌统一写为JWT
     */
    public function getHeader()
    {
        $header = [
            'alg' => $this->alg,
            'typ' => 'JWT'
        ];

        return $this->base64urlEncode(json_encode($header, JSON_UNESCAPED_UNICODE));
    }

    /**
     * Payload 部分也是一个 JSON 对象，用来存放实际需要传递的数据。JWT 规定了7个官方字段，供选用，这里可以存放私有信息，比如uid
     * @param $uid int 用户id
     * @return mixed
     */
    public function getPayload($uid)
    {
        $payload = [
            'iss' => 'admin', //签发人
            'exp' => time() + 2592000, //过期时间
            'sub' => 'test', //主题
            'aud' => 'every', //受众
            'nbf' => time(), //生效时间
            'iat' => time(), //签发时间
            'jti' => 10001, //编号
            'uid' => $uid, //私有信息，uid
        ];

        return $this->base64urlEncode(json_encode($payload, JSON_UNESCAPED_UNICODE));
    }

    /**
     * 生成token,假设现在payload里面只存一个uid
     * @param $uid int
     * @return string
     */
    public function getToken($uid)
    {
        $header  = $this->getHeader();
        $payload = $this->getPayload($uid);

        $raw   = $header . '.' . $payload;
        $token = $raw . '.' . hash_hmac($this->alg, $raw, $this->secret);

        return $token;
    }


    /**
     * 解密校验token,成功的话返回uid
     * @param $token
     * @return mixed
     */
    public function verifyToken($token)
    {
        if (!$token) {
            return 1;
        }
        $tokenArr = explode('.', $token);
        if (count($tokenArr) != 3) {
            return 2;
        }
        $header    = $tokenArr[0];
        $payload   = $tokenArr[1];
        $signature = $tokenArr[2];

        $payloadArr = json_decode($this->base64urlDecode($payload), true);

        if (!$payloadArr) {
            return 3;
        }

        //已过期
        if (isset($payloadArr['exp']) && $payloadArr['exp'] < time()) {
            return 4;
        }

        $expected = hash_hmac($this->alg, $header . '.' . $payload, $this->secret);

        //签名不对
        if ($expected !== $signature) {
            return 5;
        }

        return 0;
    }

    /**
     * 安全的base64 url编码
     * @param $data
     * @return string
     */
    private function base64urlEncode($data)
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    /**
     * 安全的base64 url解码
     * @param $data
     * @return bool|string
     */
    private function base64urlDecode($data)
    {
        return base64_decode(str_pad(strtr($data, '-_', '+/'), strlen($data) % 4, '=', STR_PAD_RIGHT));
    }
}
