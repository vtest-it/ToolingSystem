package com.vtest.it.controller;

import com.vtest.it.service.ProberCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/navigation")
public class navigationController {
    @RequestMapping("/needleCard")
    public String needleCardNavigation(){
        return "needleCard";
    }
    @RequestMapping(value = "/{path}")
    public String navigation(@PathVariable("path")String path){
        return path;
    }
}
