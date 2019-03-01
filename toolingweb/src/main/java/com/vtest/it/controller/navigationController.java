package com.vtest.it.controller;

import com.vtest.it.service.ProberCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/navigation")
public class navigationController {
    private ProberCardService proberCardService;

    @Autowired
    public void setProberCardService(ProberCardService proberCardService) {
        this.proberCardService = proberCardService;
    }

    @RequestMapping("/test")
    @ResponseBody
    public String getinfor() {
        return  proberCardService.getAllInfo();
    }
    @RequestMapping("/needleCard")
    public String needleCardNavigation(){
        return "needleCard";
    }
}
