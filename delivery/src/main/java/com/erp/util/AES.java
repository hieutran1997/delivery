package com.erp.util;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

import javax.xml.bind.DatatypeConverter;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

public class AES {

	private static SecretKeySpec secretKey;

	private static byte[] key;

	public static String secretKeyStr = "qwertyuiopasdfghjkl";

	public static void setKey()
	{
		MessageDigest sha = null;
		try {
			key = secretKeyStr.getBytes("UTF-8");
			sha = MessageDigest.getInstance("SHA-1");
			key = sha.digest(key);
			key = Arrays.copyOf(key, 16);
			secretKey = new SecretKeySpec(key, "AES");
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	}

	public static String encrypt(String strToEncrypt) {
		try {
			setKey();
			Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
			cipher.init(Cipher.ENCRYPT_MODE, secretKey);
			String token = DatatypeConverter.printBase64Binary(cipher.doFinal(strToEncrypt.getBytes("UTF-8")));
			return token.replace('+', '-').replace('/', '_').replace("%", "%25").replace("\n", "%0A");
		} catch (Exception e) {
			System.out.println("Error while encrypting: " + e.toString());
		}
		return null;
	}

	public static String decrypt(String strToDecrypt) {
		try {
			String input = strToDecrypt.replace("%0A", "\n").replace("%25", "%").replace('_', '/').replace('-', '+');
			setKey();
			Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5PADDING");
			cipher.init(Cipher.DECRYPT_MODE, secretKey);
			return new String(cipher.doFinal(DatatypeConverter.parseBase64Binary(input)));
		} catch (Exception e) {

			System.out.println("Error while decrypting: " + e.toString());
		}
		return null;

	}

}