#include <WiFi.h>
#include <NTPClient.h>
#include <WiFiUdp.h>
#include "esp_camera.h"
#include "esp_timer.h"
#include "img_converters.h"
#include "Arduino.h"
#include "soc/soc.h"           // Disable brownour problems
#include "soc/rtc_cntl_reg.h"  // Disable brownour problems
#include "driver/rtc_io.h"
#include <ESPAsyncWebServer.h>
#include <StringArray.h>
#include <SPIFFS.h>
#include <FS.h>
#include "SD_MMC.h"            // SD Card ESP32
#include <HTTPClient.h>
#include <string>
#include <EEPROM.h>            // read and write from flash memory

// Photo File Name to save in SPIFFS
#define FILE_PHOTO "/photo.jpg"
// define the number of bytes you want to access
#define EEPROM_SIZE 1
// OV2640 camera module pins (CAMERA_MODEL_AI_THINKER)
#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM      0
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27
#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       36
#define Y5_GPIO_NUM       21
#define Y4_GPIO_NUM       19
#define Y3_GPIO_NUM       18
#define Y2_GPIO_NUM        5
#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     22

//const
const char* ssid     = "Dragonboss";
const char* password = "123456789";
const char* paramType = "type";
const char* paramDay = "days";
const char* paramHour = "hours";

//variable
String formattedDate;
String dayStamp;
String timeStamp;
boolean takeNewPhoto = false;
HTTPClient http;
String type = "0"; //1: Theo tuần; 2: Theo ngày
String hours = "";
String days = "";
unsigned long nowLong;
int dayOfWeek = -1;
String defaultHour = "10:00:00";
const char* post_host = "192.168.1.20";
const int post_port = 8000;
String url = "/growth-up";
int pictureNumber = 0;

// Tạo 1 server web
AsyncWebServer server(80);

// Define NTP Client to get time
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP);
WiFiClient client;

//create web page
const char index_html[] PROGMEM = R"rawliteral(
<!DOCTYPE HTML>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1" charset="UTF-8">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
  <!-- Latest compiled and minified CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" crossorigin="anonymous">
  <!-- Optional theme -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
  <!-- Latest compiled and minified JavaScript -->
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/css/bootstrap-datetimepicker.min.css" crossorigin="anonymous" />
  <script src="https://momentjs.com/downloads/moment-with-locales.js" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/js/bootstrap-datetimepicker.min.js" crossorigin="anonymous"></script>
  <link href="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/css/select2.min.css" rel="stylesheet" crossorigin="anonymous"/>
  <script src="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/js/select2.min.js" crossorigin="anonymous"></script>
  <style>
    body {
      text-align: center;
    }
    .select2-container--default.select2-container--focus .select2-selection--multiple {
      border: 1px solid #aaa;
    }
  </style>
</head>
<body>
  <div id="container">
    <h2>Ứng dụng quản lý cammera</h2>
    <p>
      <button onclick="rotatePhoto();">ROTATE</button>
      <button onclick="capturePhoto()">CAPTURE PHOTO</button>
      <button onclick="location.reload();">REFRESH PAGE</button>
    </p>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#popup-setting">
      Đặt lịch tự động
    </button>
    <!-- Modal -->
    <div class="modal fade bd-example-modal-lg" id="popup-setting" tabindex="-1" role="dialog"
      aria-labelledby="myLargeModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <label class="modal-title" id="myLargeModalLabel">Đặt lịch tự động</label>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="container">
            <form>
              <br />
              <div class="row">
                <label class="col-md-3">Chọn thời gian lặp lại: </label>
                <div class="col-md-3">
                  <select class="form-control" id="type" name="type">
                    <option value="1" selected>Hàng tuần</option>
                    <option value="2">Hàng ngày</option>
                  </select>
                </div>
              </div>
              <br />
              <div class="row type-week">
                <label class="col-md-3">Chọn ngày lặp lại</label>
                <div class='col-md-3'>
                  <select class="form-control" id="days" style="width:100%;" multiple="multiple">
                    <option value="1">Thứ 2</option>
                    <option value="2">Thứ 3</option>
                    <option value="3">Thứ 4</option>
                    <option value="4">Thứ 5</option>
                    <option value="5">Thứ 6</option>
                    <option value="6">Thứ 7</option>
                    <option value="0">Chủ nhật</option>
                  </select>
                </div>
              </div>
              <div class="row type-day">
                <label class="col-md-3">Chọn giờ lặp lại</label>
                <div class='col-md-3'>
                  <div class="form-group">
                    <div class='input-group date' id='timepicker'>
                      <input type='text' class="form-control" id="hours" name="hours" />
                      <span class="input-group-addon">
                        <span class="glyphicon glyphicon-time"></span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <br />
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
            <button type="button" class="btn btn-primary" id="btn-save">Xác nhận</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
<script>
  $(function () {
    $('#timepicker').datetimepicker({
      format: 'LT',
      locale: 'vi'
    });
    $('#datepicker').datetimepicker({
      format: 'DD/MM/YYYY',
      locale: 'vi'
    });
    $('#days').select2();
    $('.type-day').hide();
    $('.type-week').show();
    $('#type').on('change', function(){
      var type = $('#type').val();
      if (type == 1) {
        $('.type-day').hide();
        $('.type-week').show();
      }
      else {
        $('.type-week').hide();
        $('.type-day').show();
      }
    });
    $('#btn-save').on('click', function(){
      var listDate = $("#days").val();
      var days = '';
      for(var idx = 0; idx < listDate.length; idx++){
        if(idx == 0){
          days += listDate[idx];
        }
        else{
          days += '_' + listDate[idx];
        }
      }
      var data = $("form").serialize() + "&days=" + days;;
      var xhr = new XMLHttpRequest();
      xhr.open('POST', "/post", true);
      xhr.onreadystatechange = function () { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          console.log('1');
        }
      }
      xhr.send(data);
    });
  });
</script>
</html>)rawliteral";

// Check if photo capture was successful
bool checkPhoto( fs::FS &fs ) {
  File f_pic = fs.open( FILE_PHOTO );
  unsigned int pic_sz = f_pic.size();
  return ( pic_sz > 100 );
}

// Capture Photo and Save it to SPIFFS
void capturePhotoSaveSpiffs( void ) {
  camera_fb_t * fb = NULL; // pointer
  bool ok = 0; // Boolean indicating if the picture has been taken correctly

  do {
    // Take a photo with the camera
    Serial.println("Taking a photo...");

    fb = esp_camera_fb_get();
    if (!fb) {
      Serial.println("Camera capture failed");
      return;
    }

    // Photo file name
    Serial.printf("Picture file name: %s\n", FILE_PHOTO);
    File file = SPIFFS.open(FILE_PHOTO, FILE_WRITE);

    // Insert the data in the photo file
    if (!file) {
      Serial.println("Failed to open file in writing mode");
    }
    else {
      file.write(fb->buf, fb->len); // payload (image), payload length
      Serial.print("The picture has been saved in ");
      Serial.print(FILE_PHOTO);
      Serial.print(" - Size: ");
      Serial.print(file.size());
      Serial.println(" bytes");
    }
    // Close the file
    file.close();
    esp_camera_fb_return(fb);

    // check if file has been correctly saved in SPIFFS
    ok = checkPhoto(SPIFFS);
  } while ( !ok );
}

void capturePhotoSaveSD(void){
  camera_fb_t * fb = NULL;
  
  // Take Picture with Camera
  fb = esp_camera_fb_get();  
  if(!fb) {
    Serial.println("Camera capture failed");
    return;
  }
  // initialize EEPROM with predefined size
  EEPROM.begin(EEPROM_SIZE);
  pictureNumber = EEPROM.read(0) + 1;

  // Path where new picture will be saved in SD Card
  String path = "/picture" + String(pictureNumber) +".jpg";

  fs::FS &fs = SD_MMC; 
  Serial.printf("Picture file name: %s\n", path.c_str());
  
  File file = fs.open(path.c_str(), FILE_WRITE);
  if(!file){
    Serial.println("Failed to open file in writing mode");
  } 
  else {
    file.write(fb->buf, fb->len); // payload (image), payload length
    Serial.printf("Saved file to path: %s\n", path.c_str());
    EEPROM.write(0, pictureNumber);
    EEPROM.commit();
  }
  file.close();
  esp_camera_fb_return(fb);  
}

//Read a file in SD card
void readFile(fs::FS &fs, const char * path){
    Serial.printf("Reading file: %s\n", path);

    File file = fs.open(path);
    if(!file){
        Serial.println("Failed to open file for reading");
        return;
    }

    Serial.print("Read from file: ");
    while(file.available()){
        Serial.write(file.read());
    }
}

//post file to server
void post(File myFile) {

  // open sd and file
  // String fileName = path;
  // SD.begin(0);
  // fs::File myFile = SD.open(fileName);
  String fileName = myFile.name();
  String fileSize = String(myFile.size());
  unsigned int pic_sz = myFile.size();
  Serial.println();
  Serial.println("file exists");
  Serial.println(myFile);

  if (myFile) {

    // print content length and host
    Serial.println("contentLength");
    Serial.println(fileSize);
    Serial.print("connecting to ");
    Serial.println(post_host);

    // try connect or return on fail
    if (!client.connect(post_host, post_port)) {
      Serial.println("http post connection failed");
      Serial.println("Post Failure");
    }

    // We now create a URI for the request
    Serial.println("Connected to server");
    Serial.print("Requesting URL: ");
    Serial.println(url);


    // Make a HTTP request and add HTTP headers
    String boundary = "SolarServerBoundaryjg2qVIUS8teOAbN3";
    String contentType = "image/jpg";
    String portString = String(post_port);
    String hostString = String(post_host);

    // post header
    String postHeader = "POST " + url + " HTTP/1.1\r\n";
    postHeader += "Host: " + hostString + ":" + portString + "\r\n";
    postHeader += "Content-Type: multipart/form-data; boundary=" + boundary + "\r\n";
    postHeader += "Accept: application/json, text/plain, */*\r\n";
    postHeader += "Accept-Encoding: gzip,deflate\r\n";
    postHeader += "User-Agent: Arduino/Solar-Server\r\n";
    postHeader += "Keep-Alive: 3000\r\n";
    postHeader += "Connection: keep-alive\r\n";
    postHeader += "Accept-Language: vi,en;q=0.9\r\n";

    // key header
    String keyHeader = "--" + boundary + "\r\n";
    keyHeader += "Content-Disposition: form-data; name=\"merchandiseId\"\r\n\r\n";
    keyHeader += "1\r\n";
    keyHeader += "--" + boundary + "\r\n";
    keyHeader += "Content-Disposition: form-data; name=\"processType\"\r\n\r\n";
    keyHeader += "1\r\n";

    // request header
    String requestHead = "--" + boundary + "\r\n";
    requestHead += "Content-Disposition: form-data; name=\"file\"; filename=\"" + fileName + "\"\r\n";
    requestHead += "Content-Type: " + contentType + "\r\n\r\n";


    // request tail
    String tail = "\r\n--" + boundary + "--\r\n\r\n";

    // content length
    int contentLength = keyHeader.length() + requestHead.length() + myFile.size() + tail.length();
    postHeader += "Content-Length: " + String(contentLength, DEC) + "\n\n";

    // send post header
    char charBuf0[postHeader.length() + 1];
    postHeader.toCharArray(charBuf0, postHeader.length() + 1);
    client.write(charBuf0);
    Serial.print(charBuf0);

    // send key header
    char charBufKey[keyHeader.length() + 1];
    keyHeader.toCharArray(charBufKey, keyHeader.length() + 1);
    client.write(charBufKey);
    Serial.print(charBufKey);

    // send request buffer
    char charBuf1[requestHead.length() + 1];
    requestHead.toCharArray(charBuf1, requestHead.length() + 1);
    client.write(charBuf1);
    Serial.print(charBuf1);

    // create buffer
    const int bufSize = 2048;
    byte clientBuf[bufSize];
    int clientCount = 0;
    while (myFile.available()) {
      clientBuf[clientCount] = myFile.read();
      clientCount++;
      if (clientCount > (bufSize - 1)) {
        client.write((const uint8_t *)clientBuf, bufSize);
        clientCount = 0;
      }
    }

    if (clientCount > 0) {
      client.write((const uint8_t *)clientBuf, clientCount);
      Serial.println("Sent LAST buffer");
    }
    
    // send tail
    char charBuf3[tail.length() + 1];
    tail.toCharArray(charBuf3, tail.length() + 1);
    client.write(charBuf3);
    Serial.print(charBuf3);

    // Read all the lines of the reply from server and print them to Serial
    Serial.println("request sent");
    
    // close the file:
    myFile.close();
  }
}

void setup() {
  // Initialize Serial Monitor
  Serial.begin(115200);

  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  // Connect to Wi-Fi
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  if (!SPIFFS.begin(true)) {
    Serial.println("An Error has occurred while mounting SPIFFS");
    ESP.restart();
  }
  else {
    delay(500);
    Serial.println("SPIFFS mounted successfully");
  }
  // Print ESP32 Local IP Address
  Serial.print("IP Address: http://");
  Serial.println(WiFi.localIP());
  //Lấy ngày lần đầu
  while (!timeClient.update()) {
    timeClient.forceUpdate();
  }
  dayOfWeek = timeClient.getDay();
  Serial.print("Thứ: ");
  Serial.println(dayOfWeek);
  // Turn-off the 'brownout detector'
  WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0);
  // OV2640 camera module
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;

  if (psramFound()) {
    config.frame_size = FRAMESIZE_UXGA;
    config.jpeg_quality = 10;
    config.fb_count = 2;
  } else {
    config.frame_size = FRAMESIZE_SVGA;
    config.jpeg_quality = 12;
    config.fb_count = 1;
  }
  // Camera init
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Camera init failed with error 0x%x", err);
    ESP.restart();
  }

  //Serial.println("Starting SD Card");
  if(!SD_MMC.begin()){
    Serial.println("SD Card Mount Failed");
    return;
  }
  
  uint8_t cardType = SD_MMC.cardType();
  if(cardType == CARD_NONE){
    Serial.println("No SD Card attached");
    return;
  }

  /*** Server listener **/
  // Route for root / web page
  server.on("/", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send_P(200, "text/html", index_html);
  });

  server.on("/capture", HTTP_GET, [](AsyncWebServerRequest * request) {
    takeNewPhoto = true;
    request->send_P(200, "text/plain", "Taking Photo");
  });

  server.on("/saved-photo", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send(SPIFFS, FILE_PHOTO, "image/jpg", false);
  });

  // Đặt lịch
  server.on("/post", HTTP_POST, [](AsyncWebServerRequest * request) {
    String message;
    if (request->hasParam(paramType, true)) {
      type = request->getParam(paramType, true)->value();
      Serial.print("type: ");
      Serial.println(type);
    } else {
      type = "0";
    }
    if (request->hasParam(paramDay, true)) {
      days = request->getParam(paramDay, true)->value();
    } else {
      days = "";
    }
    if (request->hasParam(paramHour, true)) {
      hours = request->getParam(paramHour, true)->value();
      hours += ":00";
      Serial.print("hour: ");
      Serial.println(hours);
    } else {
      hours = "";
    }
    request->send(200, "text/plain", "Hello, POST: " + message);
  });

  // Start server
  server.begin();
  timeClient.begin();
  timeClient.setTimeOffset(+7 * 60 * 60);
}

void loop() {
  //Chup anh
  if (takeNewPhoto) {
    capturePhotoSaveSpiffs();
    takeNewPhoto = false;
  }
  while (!timeClient.update()) {
    timeClient.forceUpdate();
  }
  formattedDate = timeClient.getFormattedTime();
  //Check 1 ngày lặp lại 1 lần lúc 00:00:00
  if(timeStamp == "00:00:01"){
    dayOfWeek = timeClient.getDay();
  }
  if(type == "1"){ //Trường hợp theo tuần
    String dayOfWeekStr = String(dayOfWeek);
    int found = days.indexOf(dayOfWeekStr); 
    if (found >= 0){
        capturePhotoSaveSpiffs();
        takeNewPhoto = false;
    }
  }
  else if(type == "2"){ // Trường hợp theo ngày
    if (hours == formattedDate) {
      //capturePhotoSaveSpiffs();
      capturePhotoSaveSD();
      takeNewPhoto = false;
      int number = EEPROM.read(0);
      String path = "/picture" + String(number) +".jpg";
      Serial.print("path: ");
      Serial.println(path);
      File f = SD_MMC.open(path);
      post(f);
//      Serial.println("Begin [HTTP]");
//      if (client.connect("192.168.1.20", 8000)) {
//        Serial.println("connected");
//        // Make a HTTP request:
//        client.println("GET /users/getAll HTTP/1.0");
//        client.println();
//      }
    }
  }
  delay(1000);
}
