<?php
namespace App\Traits;

/**
 * Simple Encryption / Decryption Class.
 * Uses PHP's OpenSSL Encrypt / Decrypt
 * @author Jhey Macarubbo <macarubbo.david@gmail.com>
 *
 * Gist: https://gist.github.com/jheyjheyjhey/230c1c11c7aca72a9cbe57801c1f691e
 *
 */
Class OpenSSLCryptoClass{
    const INPUT_ENC_METHOD = "AES-256-CBC";
    const KEY_HASH = '123456789';

    private $app_key;


    public function __construct($app_key){
        $this->app_key = md5($app_key);
    }

    /**
     * @param string|int $input - String to be encrypted
     *
     * @return string
     *
     */
    public function encrypt($input){
        return openssl_encrypt(json_encode($input), self::INPUT_ENC_METHOD, $this->app_key, 0,  substr(utf8_encode($this->app_key),0,16));
    }

    /**
     * @param string $encrypted_input - Encrypted string to be decrypted
     *
     * @return string|bool returns false if $encrypted_input isn't an encrypted string.
     *
     */
    public function decrypt($encrypted_input){
        return openssl_decrypt($encrypted_input, self::INPUT_ENC_METHOD, $this->app_key, 0, substr(utf8_encode($this->app_key),0,16));
    }

    public function example()
    {
        $a = new OpenSSLCryptoClass('123456789');
        $b= $a->encrypt(["id"=>1,"win"=>true]);
        $c = $a->decrypt('AvpafZWd4DC1ZcbqNV0s0Z2R15Y1h7XT325b508jScoxoKY2w9hmc9TSPckwA9qno/2/s53pVfeE4P5wIaYYDSa49Fvxa/DfT90SJOYbMCeGOkQUWPWUUfhA3CvTzIC5k3dpQz9Q64rN/rQDo5oV5umhWbH3ql3mSRM/+VFCvwBvzu7x26KGDnEppd2vWuiyi0gdAek2Mo8tlC81S1fftZC1Dg6GzBJTzAZuYr64oZK4SefXyM2BP0yGUOLjayJ1kQQdgMuBmEXTWvPmUxWVpxpJMtxRmrsUkpSZ8Wgi8wyQaQ4d28+zkNONAkx5atU622ECEHon+/NSyL5+Ul9qqzxkFqK/LSHDw+2qJlQSvWU=');
        dd($c);
    }
}
