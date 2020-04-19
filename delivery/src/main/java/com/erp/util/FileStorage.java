package com.erp.util;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.ParseException;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.entity.mime.HttpMultipartMode;
import org.apache.http.entity.mime.MultipartEntity;
import org.apache.http.entity.mime.content.InputStreamBody;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.params.BasicHttpParams;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;
import com.google.gson.Gson;

@SuppressWarnings("deprecation")
public class FileStorage {
    public static final Logger LOGGER = LoggerFactory.getLogger(FileStorage.class);
    
    private static final String URL = CommonUtil.getConfig("fileStorage.serverUrl");
    
    public static interface FILE_TYPE {
        public static Long GROWTH_UP_PROCESS = 1L;
    }

    
   /**
     * ham thuc hien luu file len server file
     * 
     * @param fileType:
     *            Loại file
     * @param objectId:
     *            id đối tượng lưu
     * @param file
     * @return 1: thực hiện lưu file thành công
     * @return -1: thực hiện lưu file lỗi
     * @return 0: Xóa file cũ và không lưu file mới
     * @throws IOException
     */
    public static String replace(Long fileType, Long objectId, MultipartFile file) {
        InputStream fis = null;
        try {
            String urlSave = URL + String.format("/%s/save-or-update/%s", fileType, objectId);
            HttpPost httppost = new HttpPost(urlSave);
			DefaultHttpClient httpclient = new DefaultHttpClient(new BasicHttpParams());
            if (file != null) {
                MultipartEntity entity = new MultipartEntity(HttpMultipartMode.BROWSER_COMPATIBLE, null, Charset.forName("UTF-8"));
                fis = file.getInputStream();
                entity.addPart("file", new InputStreamBody(file.getInputStream(), file.getOriginalFilename()));
                httppost.setEntity(entity);
            }

            HttpResponse response = httpclient.execute(httppost);
            int statusCode = response.getStatusLine().getStatusCode();
            HttpEntity responseEntity = response.getEntity();
            String fileId = EntityUtils.toString(responseEntity, "UTF-8");
            System.out.println("[" + statusCode + "] " + fileId);
            return fileId;
        } catch (ClientProtocolException e) {
            LOGGER.error("Unable to make connection server file storage at: " + URL, e);
            return null;
        } catch (IOException e) {
            LOGGER.error("Unable to read file", e);
            return null;
        } finally {
            try {
                if (fis != null)
                    fis.close();
            } catch (IOException e) {
                LOGGER.error("Unable to close file", e);
            }
        }
    }

    /**
     * ham thuc hien luu them file len server file
     * 
     * @param fileType:
     *            Loại file
     * @param objectId:
     *            id đối tượng lưu
     * @param file
     * @return 1: thực hiện lưu file thành công
     * @return -1: thực hiện lưu file lỗi
     * @return 0: Xóa file cũ và không lưu file mới
     * @throws IOException
     */
    public static String append(Long fileType, Long objectId, MultipartFile file) {
        if (file == null) {
            return null;
        }
        InputStream fis = null;
        try {
            DefaultHttpClient httpclient = new DefaultHttpClient(new BasicHttpParams());
            MultipartEntity entity = new MultipartEntity(HttpMultipartMode.BROWSER_COMPATIBLE, null, Charset.forName("UTF-8"));
            fis = file.getInputStream();
            entity.addPart("file", new InputStreamBody(file.getInputStream(), file.getOriginalFilename()));
            String urlSave = URL + String.format("/%s/append/%s", fileType, objectId);
            HttpPost httppost = new HttpPost(urlSave);
            httppost.setEntity(entity);
            HttpResponse response = httpclient.execute(httppost);
            int statusCode = response.getStatusLine().getStatusCode();
            HttpEntity responseEntity = response.getEntity();
            String responseString = EntityUtils.toString(responseEntity, "UTF-8");

            System.out.println("[" + statusCode + "] " + responseString);
            return responseString;
        } catch (ClientProtocolException e) {
            LOGGER.error("Unable to make connection server file storage at: " + URL, e);
            return null;
        } catch (IOException e) {
            LOGGER.error("Unable to read file", e);
            return null;
        } finally {
            try {
                if (fis != null)
                    fis.close();
            } catch (IOException e) {
                LOGGER.error("Unable to close file", e);
            }
        }
    }

    /**
     * ham thuc hien luu them file len server file
     * 
     * @param fileType:
     *            Loại file
     * @param objectId:
     *            id đối tượng lưu
     * @param file
     * @return 1: thực hiện lưu file thành công
     * @return -1: thực hiện lưu file lỗi
     * @return 0: Xóa file cũ và không lưu file mới
     * @throws IOException
     */
    public static String append(Long fileType, Long objectId, List<MultipartFile> files) {
        if (files == null || files.isEmpty()) {
            return null;
        }
        InputStream fis = null;
        try {
            DefaultHttpClient httpclient = new DefaultHttpClient(new BasicHttpParams());
            MultipartEntity entity = new MultipartEntity(HttpMultipartMode.BROWSER_COMPATIBLE, null, Charset.forName("UTF-8"));
            for (MultipartFile file : files) {
                fis = file.getInputStream();
                entity.addPart("file", new InputStreamBody(file.getInputStream(), file.getOriginalFilename()));
            }
            String urlSave = URL + String.format("/%s/append_all/%s", fileType, objectId);
            HttpPost httppost = new HttpPost(urlSave);
            httppost.setEntity(entity);
            HttpResponse response = httpclient.execute(httppost);
            int statusCode = response.getStatusLine().getStatusCode();
            HttpEntity responseEntity = response.getEntity();
            String fileId = EntityUtils.toString(responseEntity, "UTF-8");

            System.out.println("[" + statusCode + "] " + fileId);
            return fileId;
        } catch (ClientProtocolException e) {
            LOGGER.error("Unable to make connection server file storage at: " + URL, e);
            return null;
        } catch (IOException e) {
            LOGGER.error("Unable to read file", e);
            return null;
        } finally {
            try {
                if (fis != null)
                    fis.close();
            } catch (IOException e) {
                LOGGER.error("Unable to close file", e);
            }
        }
    }

    /**
     * Thuc hien xoa tat ca cac file theo loai file va danh sach objectIds
     * 
     * @param fileType
     * @param objectIds
     * @throws ParseException
     * @throws IOException
     * @throws ClientProtocolException
     */
    public static void deleteByObjectIds(Long fileType, List<Long> objectIds) throws ParseException, IOException {
        // TODO Auto-generated method stub
        if (objectIds == null || objectIds.isEmpty()) {
            return;
        }
        String urlDeletes = URL + String.format("/%s/delete-by-object-ids", fileType);
        HttpPost httppost = new HttpPost(urlDeletes);
        ArrayList<NameValuePair> postParameters = new ArrayList<NameValuePair>();
        for (Long objectId : objectIds) {
            postParameters.add(new BasicNameValuePair("objectIds", objectId + ""));
        }
        DefaultHttpClient httpclient = new DefaultHttpClient(new BasicHttpParams());
        httppost.setEntity(new UrlEncodedFormEntity(postParameters, "UTF-8"));
        HttpResponse response = httpclient.execute(httppost);
        HttpEntity responseEntity = response.getEntity();
        String responseString = EntityUtils.toString(responseEntity, "UTF-8");
        int statusCode = response.getStatusLine().getStatusCode();

        LOGGER.info("[" + statusCode + "] " + responseString);
    }

    /**
     * Ham xu ly lay danh sach file
     * 
     * @param bo
     * @param fileType:
     *            Loại file
     * @param lstObjectId:
     *            list id đối tượng lưu
     */
    public static List<FileInfoBean> getListFileInfo(Long fileType, List<String> lstObjectId) {
        InputStream fis = null;
        try {
            DefaultHttpClient httpclient = new DefaultHttpClient(new BasicHttpParams());
            String urlSave = URL + String.format("/%s/get-info?objectList=%s", fileType, String.join(",", lstObjectId));
            HttpGet httpGet = new HttpGet(urlSave);
            HttpResponse response = httpclient.execute(httpGet);
            int statusCode = response.getStatusLine().getStatusCode();
            HttpEntity responseEntity = response.getEntity();
            String responseString = EntityUtils.toString(responseEntity, "UTF-8");
            if (!CommonUtil.isNullOrEmpty(responseString)) {
                try {
                    return CommonUtil.toList(responseString, FileInfoBean.class);
                } catch (Exception e) {
                    LOGGER.error("Unable to parse json to FileInfoBean", e);
                }
            }
            LOGGER.info("[" + statusCode + "] " + responseString);
        } catch (ClientProtocolException e) {
            LOGGER.error("Unable to make connection server file storage at: " + URL, e);
        } catch (IOException e) {
            LOGGER.error("Unable to read file", e);
        } finally {
            try {
                if (fis != null)
                    fis.close();
            } catch (IOException e) {
                LOGGER.error("Unable to close file", e);
            }
        }
        return null;
    }

    /**
     * Ham xu ly lay danh sach file
     * 
     * @param bo
     * @param fileType:
     *            Loại file
     * @param objectId:
     *            id đối tượng lưu
     * @param file
     * @return 1: thực hiện lưu file thành công
     * @return -1: thực hiện lưu file lỗi
     * @return 0: Xóa file cũ và không lưu file mới
     * @throws IOException
     */
    public static List<FileInfoBean> getListFileInfo(Long fileType, Long objectId) {
        InputStream fis = null;
        try {
            DefaultHttpClient httpclient = new DefaultHttpClient(new BasicHttpParams());
            String urlSave = URL + String.format("/%s/get-info/%s", fileType, objectId);
            HttpGet httpGet = new HttpGet(urlSave);
            HttpResponse response = httpclient.execute(httpGet);
            int statusCode = response.getStatusLine().getStatusCode();
            HttpEntity responseEntity = response.getEntity();
            String responseString = EntityUtils.toString(responseEntity, "UTF-8");
            if (!CommonUtil.isNullOrEmpty(responseString)) {
                try {
                    return CommonUtil.toList(responseString, FileInfoBean.class);
                } catch (Exception e) {
                    LOGGER.error("Unable to parse json to FileInfoBean", e);
                }
            }
            LOGGER.info("[" + statusCode + "] " + responseString);
        } catch (ClientProtocolException e) {
            LOGGER.error("Unable to make connection server file storage at: " + URL, e);
        } catch (IOException e) {
            LOGGER.error("Unable to read file", e);
        } finally {
            try {
                if (fis != null)
                    fis.close();
            } catch (IOException e) {
                LOGGER.error("Unable to close file", e);
            }
        }
        return null;
    }

    public static InputStream getContentFile(Long fileType, Long objectId) {
        InputStream fis = null;
        try {
            DefaultHttpClient httpclient = new DefaultHttpClient(new BasicHttpParams());
            String urlSave = URL + String.format("/%s/get-contents/%s", fileType, objectId);
            HttpGet httpGet = new HttpGet(urlSave);
            HttpResponse response = httpclient.execute(httpGet);
            int statusCode = response.getStatusLine().getStatusCode();
            HttpEntity responseEntity = response.getEntity();
            InputStream resource = responseEntity.getContent(); 
            if (resource != null) {
                return resource;
            }
            LOGGER.info("[" + statusCode + "] " + resource);
        } catch (ClientProtocolException e) {
            LOGGER.error("Unable to make connection server file storage at: " + URL, e);
        } catch (IOException e) {
            LOGGER.error("Unable to read file", e);
        } finally {
            try {
                if (fis != null)
                    fis.close();
            } catch (IOException e) {
                LOGGER.error("Unable to close file", e);
            }
        }
        return null;
    }
    /**
     * ham thuc hien luu file len server file
     * 
     * @param fileType:
     *            Loại file
     * @param objectId:
     *            id đối tượng lưu
     * @param sysLanguageCode: id ngôn ngữ
     * @param file
     * @return 1: thực hiện lưu file thành công
     * @return -1: thực hiện lưu file lỗi
     * @return 0: Xóa file cũ và không lưu file mới
     * @throws IOException
     */
    public static String replace(Long fileType, Long objectId, String sysLanguageCode, MultipartFile file) {
        InputStream fis = null;
        try {
            String urlSave = URL + String.format("/%s/save-or-update/%s/%s", fileType, objectId, sysLanguageCode);
            HttpPost httppost = new HttpPost(urlSave);
            DefaultHttpClient httpclient = new DefaultHttpClient(new BasicHttpParams());
            if (file != null) {
                MultipartEntity entity = new MultipartEntity(HttpMultipartMode.BROWSER_COMPATIBLE, null, Charset.forName("UTF-8"));
                fis = file.getInputStream();
                entity.addPart("file", new InputStreamBody(file.getInputStream(), file.getOriginalFilename()));
                httppost.setEntity(entity);
            }

            HttpResponse response = httpclient.execute(httppost);
            int statusCode = response.getStatusLine().getStatusCode();
            HttpEntity responseEntity = response.getEntity();
            String fileId = EntityUtils.toString(responseEntity, "UTF-8");

            LOGGER.info("[" + statusCode + "] " + fileId);
            return fileId;
        } catch (ClientProtocolException e) {
            LOGGER.error("Unable to make connection server file storage at: " + URL, e);
            return null;
        } catch (IOException e) {
            LOGGER.error("Unable to read file", e);
            return null;
        } finally {
            try {
                if (fis != null)
                    fis.close();
            } catch (IOException e) {
                LOGGER.error("Unable to close file", e);
            }
        }
    }

    /**
     * ham thuc hien luu them file len server file
     * 
     * @param fileType:
     *            Loại file
     * @param objectId:
     *            id đối tượng lưu
     * @param sysLanguageCode: id ngôn ngữ
     * @param file
     * @return 1: thực hiện lưu file thành công
     * @return -1: thực hiện lưu file lỗi
     * @return 0: Xóa file cũ và không lưu file mới
     * @throws IOException
     */
    public static String append(Long fileType, Long objectId, String sysLanguageCode, MultipartFile file) {
        if (file == null) {
            return null;
        }
        InputStream fis = null;
        try {
            DefaultHttpClient httpclient = new DefaultHttpClient(new BasicHttpParams());
            MultipartEntity entity = new MultipartEntity(HttpMultipartMode.BROWSER_COMPATIBLE, null, Charset.forName("UTF-8"));
            fis = file.getInputStream();
            entity.addPart("file", new InputStreamBody(file.getInputStream(), file.getOriginalFilename()));
            String urlSave = URL + String.format("/%s/append/%s/%s", fileType, objectId, sysLanguageCode);
            HttpPost httppost = new HttpPost(urlSave);
            httppost.setEntity(entity);
            HttpResponse response = httpclient.execute(httppost);
            int statusCode = response.getStatusLine().getStatusCode();
            HttpEntity responseEntity = response.getEntity();
            String responseString = EntityUtils.toString(responseEntity, "UTF-8");

            LOGGER.info("[" + statusCode + "] " + responseString);
            return responseString;
        } catch (ClientProtocolException e) {
            LOGGER.error("Unable to make connection server file storage at: " + URL, e);
            return null;
        } catch (IOException e) {
            LOGGER.error("Unable to read file", e);
            return null;
        } finally {
            try {
                if (fis != null)
                    fis.close();
            } catch (IOException e) {
                LOGGER.error("Unable to close file", e);
            }
        }
    }

    /**
     * ham thuc hien luu them file len server file
     * 
     * @param fileType:
     *            Loại file
     * @param objectId:
     *            id đối tượng lưu
     * @param sysLanguageCode: id ngôn ngữ
     * @param file
     * @return 1: thực hiện lưu file thành công
     * @return -1: thực hiện lưu file lỗi
     * @return 0: Xóa file cũ và không lưu file mới
     * @throws IOException
     */
    public static String append(Long fileType, Long objectId, String sysLanguageCode, List<MultipartFile> files) {
        if (files == null || files.isEmpty()) {
            return null;
        }
        InputStream fis = null;
        try {
            DefaultHttpClient httpclient = new DefaultHttpClient(new BasicHttpParams());
            MultipartEntity entity = new MultipartEntity(HttpMultipartMode.BROWSER_COMPATIBLE, null, Charset.forName("UTF-8"));
            for (MultipartFile file : files) {
                fis = file.getInputStream();
                entity.addPart("file", new InputStreamBody(file.getInputStream(), file.getOriginalFilename()));
            }
            String urlSave = URL + String.format("/%s/append_all/%s/%s", fileType, objectId, sysLanguageCode);
            HttpPost httppost = new HttpPost(urlSave);
            httppost.setEntity(entity);
            HttpResponse response = httpclient.execute(httppost);
            int statusCode = response.getStatusLine().getStatusCode();
            HttpEntity responseEntity = response.getEntity();
            String fileId = EntityUtils.toString(responseEntity, "UTF-8");

            LOGGER.info("[" + statusCode + "] " + fileId);
            return fileId;
        } catch (ClientProtocolException e) {
            LOGGER.error("Unable to make connection server file storage at: " + URL, e);
            return null;
        } catch (IOException e) {
            LOGGER.error("Unable to read file", e);
            return null;
        } finally {
            try {
                if (fis != null)
                    fis.close();
            } catch (IOException e) {
                LOGGER.error("Unable to close file", e);
            }
        }
    }

    /**
     * Thuc hien xoa tat ca cac file theo loai file va danh sach objectIds
     * 
     * @param fileType
     * @param sysLanguageCode: id ngôn ngữ
     * @param objectIds
     * @throws ParseException
     * @throws IOException
     * @throws ClientProtocolException
     */
    public static void deleteByObjectIds(Long fileType, String sysLanguageCode, List<Long> objectIds) throws ParseException, IOException {
        // TODO Auto-generated method stub
        if (objectIds == null || objectIds.isEmpty()) {
            return;
        }
        String urlDeletes = URL + String.format("/%s/%s/delete-by-object-ids", fileType, sysLanguageCode);
        HttpPost httppost = new HttpPost(urlDeletes);
        ArrayList<NameValuePair> postParameters = new ArrayList<NameValuePair>();
        for (Long objectId : objectIds) {
            postParameters.add(new BasicNameValuePair("objectIds", objectId + ""));
        }
        DefaultHttpClient httpclient = new DefaultHttpClient(new BasicHttpParams());
        httppost.setEntity(new UrlEncodedFormEntity(postParameters, "UTF-8"));
        HttpResponse response = httpclient.execute(httppost);
        HttpEntity responseEntity = response.getEntity();
        String responseString = EntityUtils.toString(responseEntity, "UTF-8");
        int statusCode = response.getStatusLine().getStatusCode();
        LOGGER.info("[" + statusCode + "] " + responseString);
    }

    /**
     * Ham xu ly lay danh sach file
     * 
     * @param bo
     * @param fileType:
     *            Loại file
     * @param objectId:
     *            id đối tượng lưu
     * @param sysLanguageCode: id ngôn ngữ
     * @param file
     * @return 1: thực hiện lưu file thành công
     * @return -1: thực hiện lưu file lỗi
     * @return 0: Xóa file cũ và không lưu file mới
     * @throws IOException
     */
    public static List<FileInfoBean> getListFileInfo(Long fileType, Long objectId, String sysLanguageCode) {
        InputStream fis = null;
        try {
            DefaultHttpClient httpclient = new DefaultHttpClient(new BasicHttpParams());
            String urlSave = URL + String.format("/%s/get-info/%s/%s", fileType, objectId, sysLanguageCode);
            HttpGet httpGet = new HttpGet(urlSave);
            HttpResponse response = httpclient.execute(httpGet);
            int statusCode = response.getStatusLine().getStatusCode();
            HttpEntity responseEntity = response.getEntity();
            String responseString = EntityUtils.toString(responseEntity, "UTF-8");
            if (!CommonUtil.isNullOrEmpty(responseString)) {
                try {
                    return CommonUtil.toList(responseString, FileInfoBean.class);
                } catch (Exception e) {
                    LOGGER.error("Unable to parse json to FileInfoBean", e);
                }
            }
            LOGGER.info("[" + statusCode + "] " + responseString);
        } catch (ClientProtocolException e) {
            LOGGER.error("Unable to make connection server file storage at: " + URL, e);
        } catch (IOException e) {
            LOGGER.error("Unable to read file", e);
        } finally {
            try {
                if (fis != null)
                    fis.close();
            } catch (IOException e) {
                LOGGER.error("Unable to close file", e);
            }
        }
        return null;
    }
    public static InputStream getContentFile(Long fileType, Long objectId, String sysLanguageCode) {
        InputStream fis = null;
        try {
            DefaultHttpClient httpclient = new DefaultHttpClient(new BasicHttpParams());
            String urlSave = URL + String.format("/%s/get-contents/%s/%s", fileType, objectId, sysLanguageCode);
            HttpGet httpGet = new HttpGet(urlSave);
            HttpResponse response = httpclient.execute(httpGet);
            int statusCode = response.getStatusLine().getStatusCode();
            HttpEntity responseEntity = response.getEntity();
            InputStream resource = responseEntity.getContent(); 
            if (resource != null) {
                return resource;
            }
            LOGGER.info("[" + statusCode + "] " + resource);
        } catch (ClientProtocolException e) {
            LOGGER.error("Unable to make connection server file storage at: " + URL, e);
        } catch (IOException e) {
            LOGGER.error("Unable to read file", e);
        } finally {
            try {
                if (fis != null)
                    fis.close();
            } catch (IOException e) {
                LOGGER.error("Unable to close file", e);
            }
        }
        return null;
    }

    /**
     * 
     */
    public static void processCloneAll(List<CloneFileObject> lstCloneFile) throws ParseException, IOException {
        // TODO Auto-generated method stub
        if (lstCloneFile == null || lstCloneFile.isEmpty()) {
            return;
        }

        String urlService = URL + String.format("/process-clone-all");
        HttpPost httppost = new HttpPost(urlService);
        DefaultHttpClient httpclient = new DefaultHttpClient(new BasicHttpParams());
        Gson gson = new Gson();
        StringEntity entity = new StringEntity(gson.toJson(lstCloneFile), "utf-8");
        entity.setContentEncoding("UTF-8");
        entity.setContentType("application/json");
        httppost.setEntity(entity);
        HttpResponse response = httpclient.execute(httppost);
        HttpEntity responseEntity = response.getEntity();
        String responseString = EntityUtils.toString(responseEntity, "UTF-8");
        int statusCode = response.getStatusLine().getStatusCode();
        LOGGER.info("[" + statusCode + "] " + responseString);
    }
}