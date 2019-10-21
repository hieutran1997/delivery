package com.erp.model;

import javax.persistence.*;

@Entity
@Table(name = "Product")
public class ProductBO {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    
    @Column(name = "product_code", nullable = false, length = 20)
    private String product_code;

    @Column(name = "product_name", nullable = false, length = 255)
    private String product_name;

    @Column(name = "price", nullable = true)
    private Double price;
    
    @Column(name = "type", nullable = false, length = 20)
    private String type;
    
    @Column(name = "quantity", nullable = true)
    private Long quantity;
    
    @Column(name = "image", nullable = true, length = 1000)
    private String image;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getProduct_code() {
        return product_code;
    }

    public void setProduct_code(String product_code) {
        this.product_code = product_code;
    }

    public String getProduct_name() {
        return product_name;
    }

    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
