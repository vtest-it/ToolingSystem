package com.vtest.it.controller;

import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;

@Controller
public class fileUploadController {
    @ResponseBody
    @RequestMapping(value = "/proberCard/{id}",method = RequestMethod.GET)
    @GetMapping
    public ArrayList<String> preview(@PathVariable("id") String id) {
        try {
            String descPath="D:/upload/"+id;
            File proberCardFile=new File(descPath);
            if(!proberCardFile.exists()){
                proberCardFile.mkdir();
            }
            File[] files= proberCardFile.listFiles();
            ArrayList<String> fileList=new ArrayList<>();
            for (File file: files) {
                System.out.println(file.getAbsolutePath());
                fileList.add(file.getAbsolutePath());
            }
            return fileList;
        }catch (Exception e){
            return null;
        }

    }
    @RequestMapping("/download/{proberCard}/{SourceName:.+}")
    @ResponseBody
    public void getSource(@PathVariable("SourceName") String sourceName, @PathVariable("proberCard") String proberCard,OutputStream outputStream) {
        try {
            File source = new File("D:/upload/"+proberCard+"/"+ sourceName);
            FileInputStream fileInputStream = new FileInputStream(source);
            FileCopyUtils.copy(fileInputStream, outputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
