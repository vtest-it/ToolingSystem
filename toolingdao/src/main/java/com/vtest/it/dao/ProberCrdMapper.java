package com.vtest.it.dao;

import com.vtest.it.pojo.ProberCardEntityBean;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ProberCrdMapper {
    public void addNewProberCardInfo(ProberCardEntityBean bean);
    public List<ProberCardEntityBean> getAllList();
    public void deleteProberCardInfo(@Param("cardId") String proberCardId);
    public ProberCardEntityBean getCard(@Param("cardId")String cardId);
}
