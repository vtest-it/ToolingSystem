package com.vtest.it.pojo;

import java.util.Date;

public class BackProberCardBean {
    private String proberCardId;
    private String backuseEquipment;
    private String backStatus;
    private String backOperator;
    private String createOperator;
    private boolean issueFlag;
    private String issueDesc;
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

    public String getBackuseEquipment() {
        return backuseEquipment;
    }

    public void setBackuseEquipment(String backuseEquipment) {
        this.backuseEquipment = backuseEquipment;
    }

    public String getBackStatus() {
        return backStatus;
    }

    public void setBackStatus(String backStatus) {
        this.backStatus = backStatus;
    }

    public String getBackOperator() {
        return backOperator;
    }

    public void setBackOperator(String backOperator) {
        this.backOperator = backOperator;
    }

    public String getCreateOperator() {
        return createOperator;
    }

    public void setCreateOperator(String createOperator) {
        this.createOperator = createOperator;
    }

    public boolean isIssueFlag() {
        return issueFlag;
    }

    public void setIssueFlag(boolean issueFlag) {
        this.issueFlag = issueFlag;
    }

    public String getIssueDesc() {
        return issueDesc;
    }

    public void setIssueDesc(String issueDesc) {
        this.issueDesc = issueDesc;
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
