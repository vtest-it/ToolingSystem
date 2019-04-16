package com.vtst.it;

import com.vtest.it.pojo.ProberCardStatusBean;
import com.vtest.it.service.ProberCardService;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:spring-mybatis.xml")
public class Test {
    private ProberCardService proberCardService;

    @Autowired
    public void setProberCardService(ProberCardService proberCardService) {
        this.proberCardService = proberCardService;
    }
    @org.junit.Test
    public void test(){
        ArrayList<ProberCardStatusBean> arrayList= proberCardService.getAllProberCardStatus();
        for (ProberCardStatusBean bean :
                arrayList) {
            System.out.println(bean.getCurrentProcess()+":"+bean.getProberCardId()+":"+bean.getLastProcess()+":"+bean.getUpdateOperator());
        }
    }
}
