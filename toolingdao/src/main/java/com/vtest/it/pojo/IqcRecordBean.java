package com.vtest.it.pojo;

import java.util.Date;

public class IqcRecordBean {
    private String proberCardId;
    private double pinMaxlen;
    private double pinMinlen;
    private double pinMaxdiam;
    private double pinMindiam;
    private double pinLevel;
    private double pinDepth;
    private String updateOperator;
    private String lastProcess;
    private String nextStation;
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

    public double getPinMaxlen() {
        return pinMaxlen;
    }

    public void setPinMaxlen(double pinMaxlen) {
        this.pinMaxlen = pinMaxlen;
    }

    public double getPinMinlen() {
        return pinMinlen;
    }

    public void setPinMinlen(double pinMinlen) {
        this.pinMinlen = pinMinlen;
    }

    public double getPinMaxdiam() {
        return pinMaxdiam;
    }

    public void setPinMaxdiam(double pinMaxdiam) {
        this.pinMaxdiam = pinMaxdiam;
    }

    public double getPinMindiam() {
        return pinMindiam;
    }

    public void setPinMindiam(double pinMindiam) {
        this.pinMindiam = pinMindiam;
    }

    public double getPinLevel() {
        return pinLevel;
    }

    public void setPinLevel(double pinLevel) {
        this.pinLevel = pinLevel;
    }

    public double getPinDepth() {
        return pinDepth;
    }

    public void setPinDepth(double pinDepth) {
        this.pinDepth = pinDepth;
    }

    public String getUpdateOperator() {
        return updateOperator;
    }

    public void setUpdateOperator(String updateOperator) {
        this.updateOperator = updateOperator;
    }

    public String getLastProcess() {
        return lastProcess;
    }

    public void setLastProcess(String lastProcess) {
        this.lastProcess = lastProcess;
    }

    public String getNextStation() {
        return nextStation;
    }

    public void setNextStation(String nextStation) {
        this.nextStation = nextStation;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
