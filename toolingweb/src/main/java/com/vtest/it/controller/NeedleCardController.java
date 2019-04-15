package com.vtest.it.controller;

import com.alibaba.fastjson.JSON;
import com.vtest.it.pojo.*;
import com.vtest.it.service.ProberCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.FileNotFoundException;
import java.text.ParseException;
import java.text.SimpleDateFormat;

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
    public boolean addNewNeedleCard(String proberCardId, String custName, String custNo, String receiptTime, String vendorName, String vendorNo,
                                   String useEquipment, Integer dutCount, Integer pinCount, String cabPosition, String cardSource, String pmTd, String cardType, String newOld, String cleanType,
                                   String pinlenSpec, String pindiamSpec, String pinlevelSpec, String state, String pindepthSpec, String operator, String cardModel, String belongDept,
                                   String tdTotal, String releaseFlag, Integer glassMask, Integer mylarMask, String note) throws ParseException {
        try {
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            ProberCardEntityBean bean = new ProberCardEntityBean();
            bean.setProberCardId(proberCardId);
            bean.setCustName(custName);
            bean.setCustNo(custNo);
            bean.setReceiptTime(format.parse(receiptTime));
            bean.setVendorName(vendorName);
            bean.setVendorNo(vendorNo);
            bean.setBelongDept(belongDept);
            bean.setUseEquipment(useEquipment);
            bean.setDutCount(0);
            if (null != dutCount) {
                bean.setDutCount(dutCount);
            }
            bean.setPinCount(0);
            if (null != pinCount) {
                bean.setPinCount(pinCount);
            }
            bean.setCabPosition(cabPosition);
            bean.setCardSource(cardSource);
            bean.setPmTd(pmTd);
            bean.setCardType(cardType);
            if (newOld.equals("new")) {
                bean.setNewOld(true);
            } else {
                bean.setNewOld(false);
            }
            bean.setCleanType(cleanType);
            bean.setPindiamSpec(pindiamSpec);
            bean.setPinlevelSpec(pinlevelSpec);
            bean.setPindepthSpec(pindepthSpec);
            bean.setPinlenSpec(pinlenSpec);
            bean.setTdTotal(tdTotal);
            bean.setCardModel(cardModel);
            bean.setReleaseFlag(false);
            bean.setGlassMask(glassMask);
            bean.setMylarMask(mylarMask);
            bean.setNote(note);
            service.addNewProberCard(bean);
            return true;
        } catch (ParseException e) {
            return  false;
        }
    }

    @ResponseBody
    @RequestMapping(value = "/getAllProberCardInfos", produces = "text/html;charset=UTF-8")
    public String getAllProberCardInfo() {
        return JSON.toJSONString(service.getAllProberCards());
    }

    @ResponseBody
    @RequestMapping(value = "/delProberCards")
    public boolean deleteProberCards(@RequestParam("proberCards") String proberCards) {
        try {
            String[] list = proberCards.split(",");
            for (String proberCardId : list) {
                service.deleteProberCard(proberCardId);
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @RequestMapping(value = "/getSingletonProberCard", produces = "text/html;charset=UTF-8")
    @ResponseBody()
    public String getSingletonProberCard(@RequestParam("proberCardId") String proberCardId) {
        return JSON.toJSONString(service.getProberCard(proberCardId));
    }

    @RequestMapping("/getProberCardStatus")
    @ResponseBody
    public String getProberCardStatus(@RequestParam("proberCardId") String proberCardId) {
        return service.getProberCardStatus(proberCardId);
    }
    @RequestMapping("/iqcRelease")
    @ResponseBody
    public boolean iqcRelease(String proberCardId,double pinMaxlen,double pinMinlen,double pinMaxdiam,double pinMindiam,double pinLevel,double pinDepth,String updateOperator,String nextStation,String note){
        try {
            IqcRecordBean bean=new IqcRecordBean();
            bean.setProberCardId(proberCardId);
            bean.setPinMaxlen(pinMaxlen);
            bean.setPinMinlen(pinMinlen);
            bean.setPinMaxdiam(pinMaxdiam);
            bean.setPinMindiam(pinMindiam);
            bean.setPinLevel(pinLevel);
            bean.setPinDepth(pinDepth);
            bean.setUpdateOperator(updateOperator);
            bean.setNextStation(nextStation);
            bean.setNote(note);
            service.updateProberCardStatus(proberCardId,nextStation,"IQC",updateOperator);
            service.addNewIqcRecord(bean);
            return true;
        } catch (Exception e) {
            return  false;
        }
    }
    @ResponseBody
    @RequestMapping("/outProberCard")
    public boolean outProberCard(String proberCardId,String outuseEquipment,String outUsing,String outOperator,String nextStation,String note,String oldStatus,String operator){
        try {
            OutProberCardBean outProberCardBean=new OutProberCardBean();
            outProberCardBean.setProberCardId(proberCardId);
            outProberCardBean.setOutUseEquipment(outuseEquipment);
            outProberCardBean.setOutUsing(outUsing);
            outProberCardBean.setOutOperator(outOperator);
            outProberCardBean.setNextStation(nextStation);
            outProberCardBean.setNote(note);
            service.addNewOutRecord(outProberCardBean);
            service.updateProberCardStatus(proberCardId,nextStation,oldStatus,operator);
            return true;
        } catch (Exception e) {
            return  false;
        }
    }
    @ResponseBody
    @RequestMapping("/backProberCard")
    public boolean backProberCard(String proberCardId,String backuseEquipment,String backStatus,String backOperator,String createOperator,boolean issueFlag,String issueDesc,String nextStation,String note,String oldStatus){
        try {
            BackProberCardBean bean=new BackProberCardBean();
            bean.setProberCardId(proberCardId);
            bean.setBackuseEquipment(backuseEquipment);
            bean.setBackStatus(backStatus);
            bean.setBackOperator(backOperator);
            bean.setCreateOperator(createOperator);
            bean.setIssueFlag(issueFlag);
            bean.setIssueDesc(issueDesc);
            bean.setNextStation(nextStation);
            bean.setNote(note);
            service.addNewBackRecord(bean);
            service.updateProberCardStatus(proberCardId,nextStation,oldStatus,createOperator);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    @ResponseBody
    @RequestMapping(value = "/getReleaseProberCardInfo",produces = "text/html;charset=UTF-8")
    public String getReleaseProberCardInfo(@RequestParam("proberCardId")String proberCardId){
        return JSON.toJSONString(service.getReleaseCardInfo(proberCardId));
    }
    @ResponseBody
    @RequestMapping(value = "/releaseProbercard")
    public boolean ReleaseProberCard(String proberCardId,String pteOperator,double cardYield,String cardOperator,boolean pinMarks,boolean releaseFlag,String updateOperator,String note,String oldStatus,String nextStation){
        try {
            ReleaseProberCardBean bean=new ReleaseProberCardBean();
            bean.setProberCardId(proberCardId);
            bean.setPteOperator(pteOperator);
            bean.setCardYield(cardYield);
            bean.setCardOperator(cardOperator);
            bean.setPinMarks(pinMarks);
            bean.setReleaseFlag(releaseFlag);
            bean.setUpdateOperator(updateOperator);
            bean.setNote(note);
            service.updateReleaseProberCard(bean);
            if (releaseFlag){
                service.updateProberCardStatus(proberCardId,nextStation,oldStatus,updateOperator);
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
