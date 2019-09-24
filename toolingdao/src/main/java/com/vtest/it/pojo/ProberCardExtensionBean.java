package com.vtest.it.pojo;

import java.util.Date;

public class ProberCardExtensionBean {
    private String proberCardId;
    private String useEquipment;
    private Integer dutCount;
    private Integer pinCount;
    private String currTd;
    private String tdTotal;
    private String cardType;
    private String pinLen;
    private String pinDiam;
    private String pinLevel;
    private Integer extenCount;
    private String lastProcess;
    private boolean marksFlag;
    private double cardYield;
    private String currentProcess;
    private boolean extenFlag;
    private String creator;
    private String note;
    private Date loadTime;

    public Date getLoadTime() {
        return loadTime;
    }

    public void setLoadTime(Date loadTime) {
        this.loadTime = loadTime;
    }


    public String getProberCardId() {
        return proberCardId;
    }

    public void setProberCardId(String proberCardId) {
        this.proberCardId = proberCardId;
    }

    public String getUseEquipment() {
        return useEquipment;
    }

    public void setUseEquipment(String useEquipment) {
        this.useEquipment = useEquipment;
    }

    public Integer getDutCount() {
        return dutCount;
    }

    public void setDutCount(Integer dutCount) {
        this.dutCount = dutCount;
    }

    public Integer getPinCount() {
        return pinCount;
    }

    public void setPinCount(Integer pinCount) {
        this.pinCount = pinCount;
    }

    public String getCurrTd() {
        return currTd;
    }

    public void setCurrTd(String currTd) {
        this.currTd = currTd;
    }

    public String getTdTotal() {
        return tdTotal;
    }

    public void setTdTotal(String tdTotal) {
        this.tdTotal = tdTotal;
    }

    public String getLastProcess() {
        return lastProcess;
    }

    public void setLastProcess(String lastProcess) {
        this.lastProcess = lastProcess;
    }

    public String getCurrentProcess() {
        return currentProcess;
    }

    public void setCurrentProcess(String currentProcess) {
        this.currentProcess = currentProcess;
    }

    public String getCardType() {
        return cardType;
    }

    public void setCardType(String cardType) {
        this.cardType = cardType;
    }

    public String getPinLen() {
        return pinLen;
    }

    public void setPinLen(String pinLen) {
        this.pinLen = pinLen;
    }

    public String getPinDiam() {
        return pinDiam;
    }

    public void setPinDiam(String pinDiam) {
        this.pinDiam = pinDiam;
    }

    public String getPinLevel() {
        return pinLevel;
    }

    public void setPinLevel(String pinLevel) {
        this.pinLevel = pinLevel;
    }

    public Integer getExtenCount() {
        return extenCount;
    }

    public void setExtenCount(Integer extenCount) {
        this.extenCount = extenCount;
    }

    public boolean isMarksFlag() {
        return marksFlag;
    }

    public void setMarksFlag(boolean marksFlag) {
        this.marksFlag = marksFlag;
    }

    public double getCardYield() {
        return cardYield;
    }

    public void setCardYield(double cardYield) {
        this.cardYield = cardYield;
    }

    public boolean isExtenFlag() {
        return extenFlag;
    }

    public void setExtenFlag(boolean extenFlag) {
        this.extenFlag = extenFlag;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
