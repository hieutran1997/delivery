/*
 * Copyright (C) 2018 Viettel Telecom. All rights reserved. VIETTEL PROPRIETARY/CONFIDENTIAL. Use is
 * subject to license terms.
 */
package com.viettel.storage.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * @author vietlv2
 * @since Dec, 2018
 * @version 1.0
 */
@SpringBootApplication
@EnableSwagger2
@ComponentScan({ "com.viettel" })
@EnableAutoConfiguration
@EntityScan("com.viettel")
@EnableJpaRepositories("com.viettel")
public class FileStorageApplication {

  public static void main(String[] args) {
    SpringApplication.run(FileStorageApplication.class, args);
  }

}
