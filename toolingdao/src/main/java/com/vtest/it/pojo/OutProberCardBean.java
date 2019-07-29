package com.vtest.it.pojo;

import java.util.Date;

public class OutProberCardBean {
    private String proberCardId;
    private String outUseEquipment;
    private String outUsing;
    private String outOperator;
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

    public String getOutUseEquipment() {
        return outUseEquipment;
    }

    public void setOutUseEquipment(String outUseEquipment) {
        this.outUseEquipment = outUseEquipment;
    }

    public String getOutUsing() {
        return outUsing;
    }

    public void setOutUsing(String outUsing) {
        this.outUsing = outUsing;
    }

    public String getOutOperator() {
        return outOperator;
    }

    public void setOutOperator(String outOperator) {
        this.outOperator = outOperator;
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
