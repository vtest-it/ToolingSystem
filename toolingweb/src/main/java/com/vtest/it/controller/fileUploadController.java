package com.vtest.it.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.io.File;

@Controller
public class fileUploadController {
    @ResponseBody
    @RequestMapping(value = "/upload",method = RequestMethod.POST)
    public boolean upload( @RequestParam(value = "proberCard") String desc, @RequestParam(value = "file") CommonsMultipartFile file){
        try {
            System.out.println(desc);
            String descPath="D:/ErrorData/"+desc;
            File descFile=new File(descPath);
            if(!descFile.exists()){
                descFile.mkdir();
            }
            File newFile=new File(descFile,"/"+file.getOriginalFilename());
            file.transferTo(newFile);
            return true;
        }catch (Exception e){
            return false;
        }
    }
}
