package com.vtest.it.pojo;

import java.io.Serializable;
import java.util.Date;

public class ProberCardEntityBean implements Serializable {
    private static final long serialVersionUID=1L;
    private String proberCardId;
    private String custName;
    private String custNo;
    private Date receiptTime;
    private String vendorName;
    private String vendorNo;
    private String belongDept;
    private String useEquipment;
    private int dutCount;
    private int pinCount;
    private String cabPosition;
    private String cardSource;
    private String pmTd;
    private String cardType;
    private boolean newOld;
    private String cleanType;
    private String pinlenSpec;
    private String pindiamSpec;
    private String pinlevelSpec;
    private String pindepthSpec;
    private String tdTotal;
    private String cardModel;
    private boolean releaseFlag;
    private Integer glassMask;
    private Integer mylarMask;
    private String note;
    private Integer rebuildCount;
    private String creator;
    private String confirmer;
    private Date  loadTime;

    public Date getLoadTime() {
        return loadTime;
    }

    public void setLoadTime(Date loadTime) {
        this.loadTime = loadTime;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public String getConfirmer() {
        return confirmer;
    }

    public void setConfirmer(String confirmer) {
        this.confirmer = confirmer;
    }
    public Integer getRebuildCount() {
        return rebuildCount;
    }

    public void setRebuildCount(Integer rebuildCount) {
        this.rebuildCount = rebuildCount;
    }

    public String getProberCardId() {
        return proberCardId;
    }

    public void setProberCardId(String proberCardId) {
        this.proberCardId = proberCardId;
    }

    public String getCustName() {
        return custName;
    }

    public void setCustName(String custName) {
        this.custName = custName;
    }

    public String getCustNo() {
        return custNo;
    }

    public void setCustNo(String custNo) {
        this.custNo = custNo;
    }

    public Date getReceiptTime() {
        return receiptTime;
    }

    public void setReceiptTime(Date receiptTime) {
        this.receiptTime = receiptTime;
    }

    public String getVendorName() {
        return vendorName;
    }

    public void setVendorName(String vendorName) {
        this.vendorName = vendorName;
    }

    public String getVendorNo() {
        return vendorNo;
    }

    public void setVendorNo(String vendorNo) {
        this.vendorNo = vendorNo;
    }

    public String getBelongDept() {
        return belongDept;
    }

    public void setBelongDept(String belongDept) {
        this.belongDept = belongDept;
    }

    public String getUseEquipment() {
        return useEquipment;
    }

    public void setUseEquipment(String useEquipment) {
        this.useEquipment = useEquipment;
    }

    public int getDutCount() {
        return dutCount;
    }

    public void setDutCount(int dutCount) {
        this.dutCount = dutCount;
    }

    public int getPinCount() {
        return pinCount;
    }

    public void setPinCount(int pinCount) {
        this.pinCount = pinCount;
    }

    public String getCabPosition() {
        return cabPosition;
    }

    public void setCabPosition(String cabPosition) {
        this.cabPosition = cabPosition;
    }

    public String getCardSource() {
        return cardSource;
    }

    public void setCardSource(String cardSource) {
        this.cardSource = cardSource;
    }

    public String getPmTd() {
        return pmTd;
    }

    public void setPmTd(String pmTd) {
        this.pmTd = pmTd;
    }

    public String getCardType() {
        return cardType;
    }

    public void setCardType(String cardType) {
        this.cardType = cardType;
    }

    public boolean isNewOld() {
        return newOld;
    }

    public void setNewOld(boolean newOld) {
        this.newOld = newOld;
    }

    public String getCleanType() {
        return cleanType;
    }

    public void setCleanType(String cleanType) {
        this.cleanType = cleanType;
    }

    public String getPinlenSpec() {
        return pinlenSpec;
    }

    public void setPinlenSpec(String pinlenSpec) {
        this.pinlenSpec = pinlenSpec;
    }

    public String getPindiamSpec() {
        return pindiamSpec;
    }

    public void setPindiamSpec(String pindiamSpec) {
        this.pindiamSpec = pindiamSpec;
    }

    public String getPinlevelSpec() {
        return pinlevelSpec;
    }

    public void setPinlevelSpec(String pinlevelSpec) {
        this.pinlevelSpec = pinlevelSpec;
    }

    public String getPindepthSpec() {
        return pindepthSpec;
    }

    public void setPindepthSpec(String pindepthSpec) {
        this.pindepthSpec = pindepthSpec;
    }

    public String getTdTotal() {
        return tdTotal;
    }

    public void setTdTotal(String tdTotal) {
        this.tdTotal = tdTotal;
    }

    public String getCardModel() {
        return cardModel;
    }

    public void setCardModel(String cardModel) {
        this.cardModel = cardModel;
    }

    public boolean isReleaseFlag() {
        return releaseFlag;
    }

    public void setReleaseFlag(boolean releaseFlag) {
        this.releaseFlag = releaseFlag;
    }

    public Integer getGlassMask() {
        return glassMask;
    }

    public void setGlassMask(Integer glassMask) {
        this.glassMask = glassMask;
    }

    public Integer getMylarMask() {
        return mylarMask;
    }

    public void setMylarMask(Integer mylarMask) {
        this.mylarMask = mylarMask;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

}
