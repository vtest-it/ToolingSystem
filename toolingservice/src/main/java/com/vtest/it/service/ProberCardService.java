package com.vtest.it.service;

import com.vtest.it.dao.ProberCrdMapper;
import com.vtest.it.pojo.ProberCardEntityBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProberCardService {
    private ProberCrdMapper mapper;

    @Autowired
    public void setMapper(ProberCrdMapper mapper) {
        this.mapper = mapper;
    }

    public String getAllInfo() {
        List<ProberCardEntityBean> list = mapper.getAllList();
        StringBuilder builder=new StringBuilder();
        for (ProberCardEntityBean bean : list) {
                builder.append(bean.getProberCardId());
        }
        return  builder.toString();
    }
    public void addNewProberCard(ProberCardEntityBean bean){
        mapper.addNewProberCardInfo(bean);
    }
    public List<ProberCardEntityBean> getAllProberCards(){
        return  mapper.getAllList();
    }
    public void deleteProberCard(String cardId){
        mapper.deleteProberCardInfo(cardId);
    }
    public ProberCardEntityBean getProberCard(String cardId){
        return  null;
    }

}
