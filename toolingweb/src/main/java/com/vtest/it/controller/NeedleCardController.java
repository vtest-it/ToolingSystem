package com.vtest.it.controller;

import com.alibaba.fastjson.JSON;
import com.vtest.it.pojo.*;
import com.vtest.it.service.ProberCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.io.File;
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
                                   String pinlenSpec, String pindiamSpec, String pinlevelSpec, String state, String pindepthSpec, String creator, String cardModel, String belongDept,
                                   String tdTotal, String releaseFlag, Integer glassMask, Integer mylarMask, String note,Integer rebuildCount,String confirmer) throws ParseException {
        try {
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
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
            bean.setRebuildCount(rebuildCount);
            bean.setCreator(creator);
            bean.setConfirmer(confirmer);
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
    public boolean iqcRelease(String proberCardId,double pinMaxlen,double pinMinlen,double pinMaxdiam,double pinMindiam,double pinLevel,double pinDepth,String updateOperator,String nextStation,String note,String oldStatus,@RequestParam(value = "excelFile") CommonsMultipartFile file){
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
            String descPath="D:/upload/"+proberCardId;
            File descFile=new File(descPath);
            if(!descFile.exists()){
                descFile.mkdir();
            }
            File newFile=new File(descFile,"/"+file.getOriginalFilename());
            file.transferTo(newFile);
            service.updateProberCardStatus(proberCardId,nextStation,oldStatus,updateOperator);
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
    @ResponseBody
    @RequestMapping("/getAllProberCardStatus")
    public String getAllProberCardStatus(){
        return  JSON.toJSONString(service.getAllProberCardStatus());
    }
    @ResponseBody
    @RequestMapping("/ProberCardMaintain")
    public boolean ProberCardMaintain(String proberCardId,double beforePinlen,double beforePindiam,double beforePinlevel,double afterPinlen,double afterPindiam,double afterPinlevel,boolean cleanFlag,boolean grindingFlag,boolean corrosionFlag,boolean adjustmentFlag,boolean bakeFlag,boolean handgrindFlag,boolean checksolderFlag,boolean maintsolderFlag,
                                      boolean checkpartsFlag,boolean changepartsFlag,boolean jumperFlag,String nextStation,String testerID,String updateOperator,String note,String oldStatus,double rebuildCount){
        try {
            ProberCardMaintainBean bean =new ProberCardMaintainBean();
            bean.setProberCardId(proberCardId);
            bean.setBeforePinlen(beforePinlen);
            bean.setBeforePindiam(beforePindiam);
            bean.setBeforePinlevel(beforePinlevel);
            bean.setAfterPinlen(afterPinlen);
            bean.setAfterPindiam(afterPindiam);
            bean.setAfterPinlevel(afterPinlevel);
            bean.setAdjustmentFlag(adjustmentFlag);
            bean.setBakeFlag(bakeFlag);
            bean.setChangepartsFlag(changepartsFlag);
            bean.setCheckpartsFlag(checkpartsFlag);
            bean.setCleanFlag(cleanFlag);
            bean.setChecksolderFlag(checksolderFlag);
            bean.setCorrosionFlag(corrosionFlag);
            bean.setGrindingFlag(grindingFlag);
            bean.setHandgrindFlag(handgrindFlag);
            bean.setJumperFlag(jumperFlag);
            bean.setMaintsolderFlag(maintsolderFlag);
            bean.setUpdateOperator(updateOperator);
            bean.setNote(note);
            bean.setTesterID(testerID);
            bean.setNextStation(nextStation);
            bean.setRebuildCount(rebuildCount);
            service.addNewMaintainRecord(bean);
            service.updateProberCardStatus(proberCardId,nextStation,oldStatus,updateOperator);
            return  true;
        }catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }
    @RequestMapping("/updateProberCard")
    @ResponseBody
    public boolean updateProberCard(String proberCardId, String custName, String custNo, String receiptTime, String vendorName, String vendorNo,
                                    String useEquipment, Integer dutCount, Integer pinCount, String cabPosition, String cardSource, String pmTd, String cardType, String newOld, String cleanType,
                                    String pinlenSpec, String pindiamSpec, String pinlevelSpec, String state, String pindepthSpec, String creator, String cardModel, String belongDept,
                                    String tdTotal, String releaseFlag, Integer glassMask, Integer mylarMask, String note,String confirmer) {
        try {
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
            ProberCardEntityBean bean= new ProberCardEntityBean();
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
            bean.setCreator(creator);
            bean.setConfirmer(confirmer);
            if(releaseFlag.equals("Release")){
                bean.setReleaseFlag(true);
            }else {
                bean.setReleaseFlag(false);
            }
            bean.setGlassMask(glassMask);
            bean.setMylarMask(mylarMask);
            bean.setNote(note);
            service.updateProberCard(bean);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return  false;

        }
    }
    @RequestMapping("/getProberCardReleaseFlag")
    @ResponseBody
    public boolean getProberCardReleaseFlag(String proberCardId ){
        return  service.getProberCardReleaseFlag(proberCardId);
    }
    @ResponseBody
    @RequestMapping(value = "/checkProbercard")
    public boolean checkProberCard(String proberCardId,String pteOperator,double cardYield,String cardOperator,boolean pinMarks,boolean releaseFlag,String updateOperator,String note,String oldStatus,String nextStation){
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
            service.updateProberCardStatus(proberCardId,nextStation,oldStatus,updateOperator);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    @ResponseBody
    @RequestMapping(value = "/updateProberCardReleaseFlag")
    public boolean updateProberCardReleaseFlag(String proberCardId,boolean releaseFlag){
        try {
            service.updateProberCardReleaseFlag(proberCardId,releaseFlag);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    @ResponseBody
    @RequestMapping(value = "/updateProberCardInfoReleaseFlag")
    public boolean updateProberCardInfoReleaseFlag(String proberCardId,boolean releaseFlag){
        try {
            service.updateProberCardInfoReleaseFlag(proberCardId,releaseFlag);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    @ResponseBody
    @RequestMapping(value = "/updateSingleState")
    public boolean updateSingleState(String proberCardId,String currentProcess){
        try {
            service.updateSingleState(proberCardId,currentProcess);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    @ResponseBody
    @RequestMapping("/getAllIQCRecord")
    public String getAllIQCRecord(){
        return  JSON.toJSONString(service.getAllIQCRecord());
    }
    @ResponseBody
    @RequestMapping("/getAllMaintainRecord")
    public String getAllMaintainRecord(){
        return  JSON.toJSONString(service.getAllMaintainRecord());
    }
    @ResponseBody
    @RequestMapping(value = "/updateProberCardItem")
    public boolean updateProberCardItem(String proberCardId,String pinlenSpec,String pindiamSpec,String pinlevelSpec,Integer rebuildCount){
        try {
             pinlenSpec=String.valueOf(0);
             pindiamSpec=String.valueOf(0);
             pinlevelSpec=String.valueOf(0);
             rebuildCount++;
            service.updateProberCardItem(proberCardId,pinlenSpec,pindiamSpec,pinlevelSpec,rebuildCount);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    @ResponseBody
    @RequestMapping(value = "/updateMaintainItem")
    public boolean updateMaintainItem(String proberCardId,double afterPinlen,double afterPindiam,double afterPinlevel){
        try {
            afterPinlen=0;
            afterPindiam=0;
            afterPinlevel=0;
            service.updateMaintainItem(proberCardId,afterPinlen,afterPindiam,afterPinlevel);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    @ResponseBody
    @RequestMapping(value = "/updateIQCItem")
    public boolean updateIQCItem(String proberCardId,double pinMinlen, double pinMaxdiam,double pinLevel){
        try {
            pinMinlen=0;
            pinMaxdiam=0;
            pinLevel=0;
            service.updateIQCItem(proberCardId,pinMinlen,pinMaxdiam,pinLevel);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    @ResponseBody
    @RequestMapping(value = "/getInfoRebuildCount")
    public Integer getInfoRebuildCount(String proberCardId){
       return  service.getInfoRebuildCount(proberCardId);
    }
    @ResponseBody
    @RequestMapping(value = "/getTd")
    public String getTd(){
        return JSON.toJSONString(service.getTd());
    }
    @ResponseBody
    @RequestMapping(value = "/getOutProberCard", produces = "text/html;charset=UTF-8")
    public String getOutProberCard(String[] proberCardIdArrays){
        return JSON.toJSONString(service.getOutProberCard(proberCardIdArrays));
    }
    @ResponseBody
    @RequestMapping(value = "/getBackProberCard", produces = "text/html;charset=UTF-8")
    public String getBackProberCard(String[] proberCardIdArrays){
        return JSON.toJSONString(service.getBackProberCard(proberCardIdArrays));
    }
    @ResponseBody
    @RequestMapping(value = "/getInfoProberCard", produces = "text/html;charset=UTF-8")
    public String getInfoProberCard(String[] proberCardIdArrays){
        return JSON.toJSONString(service.getInfoProberCard(proberCardIdArrays));
    }
    @ResponseBody
    @RequestMapping(value = "/getIQCProberCard", produces = "text/html;charset=UTF-8")
    public String getIQCProberCard(String[] proberCardIdArrays){
        return JSON.toJSONString(service.getIQCProberCard(proberCardIdArrays));
    }
    @ResponseBody
    @RequestMapping(value = "/getMaintainProberCard", produces = "text/html;charset=UTF-8")
    public String getMaintainProberCard(String[] proberCardIdArrays){
        return JSON.toJSONString(service.getMaintainProberCard(proberCardIdArrays));
    }
    @ResponseBody
    @RequestMapping(value = "/getReleaseProberCard", produces = "text/html;charset=UTF-8")
    public String getReleaseProberCard(String[] proberCardIdArrays){
        return JSON.toJSONString(service.getReleaseProberCard(proberCardIdArrays));
    }
    @ResponseBody
    @RequestMapping(value = "/getProberCardId", produces = "text/html;charset=UTF-8")
    public String getProberCardId(String[] custNameArrays){
        return JSON.toJSONString(service.getProberCardId(custNameArrays));
    }
}
