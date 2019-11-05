package com.vtest.it.dao.prober;

import com.vtest.it.pojo.*;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;
import java.util.List;

public interface ProberCardRemainMapper {

    public List<ProberCardEntityBean> getAllList();



    public ProberCardEntityBean getCard(@Param("cardId") String cardId);



    public String getProberCardStatus(@Param("proberCardId") String proberCardId);



    public ReleaseProberCardBean getReleaseCardInfo(@Param("proberCardId") String proberCardId);


    public ArrayList<ProberCardStatusBean> getAllProberCardStatus();



    public boolean getProberCardReleaseFlag(@Param("proberCardId") String proberCardId);



    public ArrayList<IqcRecordBean> getAllIQCRecord();

    public ArrayList<ProberCardMaintainBean> getAllMaintainRecord();



    public Integer getInfoRebuildCount(@Param("proberCardId") String proberCardId);

    public ArrayList<ProberCardTDBean> getTd();

    public ArrayList<OutProberCardBean> getOutProberCard(@Param("proberCardIdArrays") String[] proberCardIdArrays);

    public ArrayList<BackProberCardBean> getBackProberCard(@Param("proberCardIdArrays") String[] proberCardIdArrays);

    public ArrayList<ProberCardEntityBean> getInfoProberCard(@Param("proberCardIdArrays") String[] proberCardIdArrays);

    public ArrayList<IqcRecordBean> getIQCProberCard(@Param("proberCardIdArrays") String[] proberCardIdArrays);

    public ArrayList<ProberCardMaintainBean> getMaintainProberCard(@Param("proberCardIdArrays") String[] proberCardIdArrays);

    public ArrayList<ReleaseProberCardBean> getReleaseProberCard(@Param("proberCardIdArrays") String[] proberCardIdArrays);

    public ArrayList<ProberCardEntityBean> getProberCardId(@Param("custNameArrays") String[] custNameArrays);

    public ArrayList<ProberCardExtensionBean> getEXRecord(@Param("proberCardIdArrays") String[] proberCardIdArrays);


    public ArrayList<String> getProberCardEX();

    public ArrayList<ProberCardExtensionBean> getEXInfoSingle(@Param("proberCardId") String proberCardId);

    public ArrayList<IqcRecordBean> getAllIQCRecordByMinTime();

    public ArrayList<IqcRecordBean> getAllIQCRecordByMaxTime();


}
