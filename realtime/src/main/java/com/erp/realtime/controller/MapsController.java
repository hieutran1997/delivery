package com.erp.realtime.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.erp.realtime.model.ItemInMaps;

@Controller
public class MapsController {

    private List<ItemInMaps> lstItem = new ArrayList<>();

    @MessageMapping("/maps.join")
    @SendTo("/topic/maps/public/item")
    public ItemInMaps joinMaps(@Payload ItemInMaps item) {
        ItemInMaps oldItem = lstItem.stream().filter(x -> x.getUserName().equals(item.getUserName())).findAny().orElse(null);
        if (oldItem != null) {
            lstItem.remove(oldItem);
            lstItem.add(item);
            return item;
        }
        lstItem.add(item);
        return item;
    }

    @MessageMapping("/maps.getall")
    @SendTo("/topic/maps/public/all")
    public List<ItemInMaps> getAllMaps(@Payload String value) {
        return lstItem;
    }
}
