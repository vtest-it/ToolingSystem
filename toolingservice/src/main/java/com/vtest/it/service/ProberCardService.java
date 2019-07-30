package com.vtest.it.service;

import com.vtest.it.dao.prober.ProberCrdMapper;
import com.vtest.it.pojo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE, rollbackFor = {Exception.class})
public class ProberCardService {
    private ProberCrdMapper mapper;
    @Autowired
    public void setMapper(ProberCrdMapper mapper) {
        this.mapper = mapper;
    }

    public void addNewProberCard(ProberCardEntityBean bean) {
        mapper.addNewProberCardInfo(bean);
        mapper.proberCardCreateState(bean.getProberCardId(), "New_Prod", "IQC", "V149");
    }

    @Transactional(isolation = Isolation.REPEATABLE_READ, readOnly = true)
    public List<ProberCardEntityBean> getAllProberCards() {
        return mapper.getAllList();
    }

    public void deleteProberCard(String cardId) {
        mapper.deleteProberCardInfo(cardId);
    }

    @Transactional(isolation = Isolation.REPEATABLE_READ, readOnly = true)
    public ProberCardEntityBean getProberCard(String cardId) {
        return mapper.getCard(cardId);
    }

    @Transactional(isolation = Isolation.REPEATABLE_READ, readOnly = true)
    public String getProberCardStatus(String proberCardId) {
        return mapper.getProberCardStatus(proberCardId);
    }

    public void addNewIqcRecord(IqcRecordBean bean) {
        mapper.addNewIqcRecord(bean);
    }

    public void updateProberCardStatus(String proberCardId, String newStatus, String oldStatus, String operator) throws FileNotFoundException {
        mapper.updateProberCardState(proberCardId, newStatus, oldStatus, operator);
    }

    public void addNewOutRecord(OutProberCardBean bean) {
        mapper.outProberCard(bean);
    }

    public void addNewBackRecord(BackProberCardBean bean) {
        mapper.addNewBackRecord(bean);
    }

    @Transactional(isolation = Isolation.REPEATABLE_READ, readOnly = true)
    public ReleaseProberCardBean getReleaseCardInfo(String proberCardId) {
        return mapper.getReleaseCardInfo(proberCardId);
    }

    public void updateReleaseProberCard(ReleaseProberCardBean bean) {
        mapper.addnewReleaseProberCard(bean);
    }

    public ArrayList<ProberCardStatusBean> getAllProberCardStatus() {
        return mapper.getAllProberCardStatus();
    }

    public void addNewMaintainRecord(ProberCardMaintainBean bean){
        mapper.addNewMaintainRecord(bean);
    }

    public void updateProberCard(ProberCardEntityBean bean){
        mapper.updateProberCard(bean);
    }
    @Transactional(isolation = Isolation.REPEATABLE_READ, readOnly = true)
    public boolean getProberCardReleaseFlag(String proberCardId){
        return mapper.getProberCardReleaseFlag(proberCardId);
    }
    public boolean updateProberCardReleaseFlag(String proberCardId,boolean releaseFlag){
        return mapper.updateProberCardReleaseFlag(proberCardId,releaseFlag);
    }
    public boolean updateProberCardInfoReleaseFlag(String proberCardId,boolean releaseFlag){
        return mapper.updateProberCardInfoReleaseFlag(proberCardId,releaseFlag);
    }
    public boolean updateSingleState(String proberCardId,String currentProcess){
        return mapper.updateSingleState(proberCardId,currentProcess);
    }
    public ArrayList<IqcRecordBean> getAllIQCRecord(){  return  mapper.getAllIQCRecord();}

    public ArrayList<ProberCardMaintainBean> getAllMaintainRecord(){  return  mapper.getAllMaintainRecord();}

    public  boolean  updateProberCardItem(String proberCardId,String pinlenSpec,String pindiamSpec,String pinlevelSpec,Integer rebuildCount){
       return  mapper.updateProberCardItem(proberCardId,pinlenSpec,pindiamSpec,pinlevelSpec,rebuildCount);
    }
    public  boolean  updateMaintainItem(String proberCardId,double afterPinlen,double afterPindiam,double afterPinlevel){
        return  mapper.updateMaintainItem(proberCardId,afterPinlen,afterPindiam,afterPinlevel);
    }
    public  boolean  updateIQCItem(String proberCardId,double pinMinlen, double pinMaxdiam,double pinLevel){
        return  mapper.updateIQCItem(proberCardId,pinMinlen,pinMaxdiam,pinLevel);
    }
    @Transactional(isolation = Isolation.REPEATABLE_READ, readOnly = true)
    public Integer getInfoRebuildCount(String proberCardId){
        return mapper.getInfoRebuildCount(proberCardId);
    }
    
   public ArrayList<ProberCardTDBean> getTd(){
        return  mapper.getTd();
   }
    @Transactional(isolation = Isolation.REPEATABLE_READ, readOnly = true)
   public ArrayList<OutProberCardBean> getOutProberCard(String[] proberCardIdArrays){
        return  mapper.getOutProberCard(proberCardIdArrays);
   }
    @Transactional(isolation = Isolation.REPEATABLE_READ, readOnly = true)
   public ArrayList<BackProberCardBean> getBackProberCard(String[] proberCardIdArrays){
        return  mapper.getBackProberCard(proberCardIdArrays);
   }
    @Transactional(isolation = Isolation.REPEATABLE_READ, readOnly = true)
    public ArrayList<ProberCardEntityBean> getInfoProberCard(String[] proberCardIdArrays){
        return  mapper.getInfoProberCard(proberCardIdArrays);
    }
    @Transactional(isolation = Isolation.REPEATABLE_READ, readOnly = true)
    public ArrayList<IqcRecordBean> getIQCProberCard(String[] proberCardIdArrays){
        return  mapper.getIQCProberCard(proberCardIdArrays);
    }
    @Transactional(isolation = Isolation.REPEATABLE_READ, readOnly = true)
    public ArrayList<ProberCardMaintainBean> getMaintainProberCard(String[] proberCardIdArrays){
        return  mapper.getMaintainProberCard(proberCardIdArrays);
    }
    @Transactional(isolation = Isolation.REPEATABLE_READ, readOnly = true)
    public ArrayList<ReleaseProberCardBean> getReleaseProberCard(String[] proberCardIdArrays){
        return  mapper.getReleaseProberCard(proberCardIdArrays);
    }
}
