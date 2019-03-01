package com.vtest.it.controller;

import com.vtest.it.pojo.ProberCardEntityBean;
import com.vtest.it.service.ProberCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.TimeZone;

@Controller
@RequestMapping("/needleCard")
public class NeedleCardController {
    private ProberCardService service;

    @Autowired
    public void setService(ProberCardService service) {
        this.service = service;
    }

    @RequestMapping("/addNewNeedleCard")
    @ResponseBody
    public String addNewNeedleCard(String needleCardNumber, String customer, String customerCode, String incomingDate, String factory, String factoryNumber,
                                   String applicableMachine, Integer dutNumber, Integer pinNumber, String counter, String source, String pmTime, String type, String newOld, String cleanType,
                                   String needleLengthSpec, String needleDiameterSpec, String levelSpec, String state, String depth, String operator, String cardModel, String propertyUnit,
                                   String tdTotal, String isRelease, String remarks) throws ParseException {
        SimpleDateFormat format=new SimpleDateFormat("yyyy-MM-dd");
        ProberCardEntityBean bean=new ProberCardEntityBean();
        bean.setProberCardId(needleCardNumber);
        bean.setCustName(customer);
        bean.setCustNo(customerCode);
        bean.setReceiptTime(format.parse(incomingDate));
        bean.setVendorName(factory);
        bean.setVendorNo(factoryNumber);
        bean.setBelongDept(propertyUnit);
        bean.setUseEquipment(applicableMachine);
        bean.setDutCount(dutNumber);
        bean.setPinCount(pinNumber);
        bean.setCabPosition(counter);
        bean.setCardSource(source);
        bean.setPmTd(pmTime);
        bean.setCardType(type);
        if (newOld.equals("new")){
            bean.setNewOld(true);
        }else {
            bean.setNewOld(false);
        }
        bean.setCleanType(cleanType);
        bean.setPindiamSpec(needleDiameterSpec);
        bean.setPinlevelSpec(levelSpec);
        bean.setPindepthSpec(depth);
        bean.setPinlenSpec(needleLengthSpec);
        bean.setTdTotal(tdTotal);
        bean.setCardModel(cardModel);
        bean.setReleaseFlag(false);
        bean.setNote(remarks);
        service.addNewProberCard(bean);
        return  incomingDate+":"+format.parse(incomingDate);
    }
}
