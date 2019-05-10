package com.vtest.it.dao;

import com.vtest.it.pojo.*;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;
import java.util.List;

public interface ProberCrdMapper {
    public void addNewProberCardInfo(ProberCardEntityBean bean);

    public List<ProberCardEntityBean> getAllList();

    public void deleteProberCardInfo(@Param("cardId") String proberCardId);

    public ProberCardEntityBean getCard(@Param("cardId") String cardId);

    public void proberCardCreateState(@Param("proberCardId") String proberCardId, @Param("lastProcess") String lastProcess, @Param("currentProcess") String currentProcess, @Param("op") String operator);

    public void addNewIqcRecord(IqcRecordBean bean);

    public String getProberCardStatus(@Param("proberCardId") String proberCardId);

    public void updateProberCardState(@Param("proberCardId") String proberCardId, @Param("NewStatus") String newStatus, @Param("odlStatus") String oldStatus, @Param("operator") String operator);

    public void outProberCard(OutProberCardBean bean);

    public void addNewBackRecord(BackProberCardBean bean);

    public ReleaseProberCardBean getReleaseCardInfo(@Param("proberCardId") String proberCardId);

    public void addnewReleaseProberCard(ReleaseProberCardBean bean);

    public ArrayList<ProberCardStatusBean> getAllProberCardStatus();

    public void addNewMaintainRecord(ProberCardMaintainBean bean);

    public void updateProberCard(ProberCardEntityBean bean);

    public boolean getProberCardReleaseFlag(@Param("proberCardId") String proberCardId);

    public boolean updateProberCardReleaseFlag(@Param("proberCardId") String proberCardId,@Param("releaseFlag")boolean releaseFlag);

    public boolean updateSingleState(@Param("proberCardId") String proberCardId,@Param("currentProcess")String currentProcess);

    public ArrayList<IqcRecordBean> getAllIQCRecord();

    public ArrayList<ProberCardMaintainBean> getAllMaintainRecord();

}
