-- ----------------------------------------------------------
-- 创建数据库
-- ----------------------------------------------------------
# 设置客户端连接mysql使用的编码
SET NAMES UTF8;
# 删除(丢弃)数据库3zfamily,如果数据库存在
DROP DATABASE IF EXISTS 3zfamily;
# 创建数据库,使用UTF8作为数据库（服务器端）的编码
CREATE DATABASE 3zfamily CHARSET=UTF8;
# 进入数据库3zfamily
USE 3zfamily;

-- ----------------------------------------------------------
-- 首页轮播图表结构   `index_banner_carousel`
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `index_banner_carousel`;
CREATE TABLE `index_banner_carousel`(
    `bid` INT(11) NOT NULL AUTO_INCREMENT,      #轮播图编号
    `title` VARCHAR(64) DEFAULT NULL,           #轮播图描述
    `img_url` VARCHAR(128) DEFAULT NULL,        #轮播图片地址
    `href` VARCHAR(128) DEFAULT NULL,           #轮播图跳转锚点
    PRIMARY KEY  (`bid`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `index_banner_carousel` VALUES (1,'智能鞋柜护理机','img/index/index_banner_carousel_1.jpg','#');
INSERT INTO `index_banner_carousel` VALUES (2,'毛坯房装修步骤','img/index/index_banner_carousel_2.jpg','#');
INSERT INTO `index_banner_carousel` VALUES (3,'哪种风格适合你','img/index/index_banner_carousel_3.jpg','#');
INSERT INTO `index_banner_carousel` VALUES (4,'阳台要不要砌洗衣机','img/index/index_banner_carousel_4.jpg','#');
INSERT INTO `index_banner_carousel` VALUES (5,'瓷砖还有这样的操作？','img/index/index_banner_carousel_5.jpg','#');

-- ----------------------------------------------------------
-- 首页设计图推荐   `index_design_pic`
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `index_design_pic`;
CREATE TABLE `index_design_pic`(
    `pid` INT(11) NOT NULL AUTO_INCREMENT,      #设计图编号
    `style` VARCHAR(64) NOT NULL,               #设计图所属风格
    `pic_url` VARCHAR(64) NOT NULL,             #设计图地址
    PRIMARY KEY(`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
INSERT INTO `index_design_pic` VALUES (NULL,'现代简约','img/index/xdjy_1.jpg');
INSERT INTO `index_design_pic` VALUES (NULL,'现代简约','img/index/xdjy_2.jpg');
INSERT INTO `index_design_pic` VALUES (NULL,'现代简约','img/index/xdjy_3.jpg');
INSERT INTO `index_design_pic` VALUES (NULL,'古典中式','img/index/gdzs_1.jpg');
INSERT INTO `index_design_pic` VALUES (NULL,'古典中式','img/index/gdzs_2.jpg');
INSERT INTO `index_design_pic` VALUES (NULL,'古典中式','img/index/gdzs_3.jpg');
INSERT INTO `index_design_pic` VALUES (NULL,'富丽欧式','img/index/flos_1.jpg');
INSERT INTO `index_design_pic` VALUES (NULL,'富丽欧式','img/index/flos_2.jpg');
INSERT INTO `index_design_pic` VALUES (NULL,'富丽欧式','img/index/flos_3.jpg');
INSERT INTO `index_design_pic` VALUES (NULL,'更多风格>>','img/index/gdfg_1.jpg');
INSERT INTO `index_design_pic` VALUES (NULL,'更多风格>>','img/index/gdfg_2.jpg');
INSERT INTO `index_design_pic` VALUES (NULL,'更多风格>>','img/index/gdfg_3.jpg');

-- ----------------------------------------------------------
-- 装修公司页轮播图表结构   `com_banner_carousel`
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `com_banner_carousel`;
CREATE TABLE `com_banner_carousel`(
    `bid` INT(11) NOT NULL AUTO_INCREMENT,      #轮播图编号
    `title` VARCHAR(64) DEFAULT NULL,           #轮播图描述
    `img_url` VARCHAR(128) DEFAULT NULL,        #轮播图片地址
    `href` VARCHAR(128) DEFAULT NULL,           #轮播图跳转锚点
    PRIMARY KEY  (`bid`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `com_banner_carousel` VALUES (1,'6平米的厨房','img/company_list/carousel_1.png','#');
INSERT INTO `com_banner_carousel` VALUES (2,'感恩那些提升幸福感的家居用品','img/company_list/carousel_2.png','#');
INSERT INTO `com_banner_carousel` VALUES (3,'卧室装修如何静音','img/company_list/carousel_3.png','#');

-- ----------------------------------------------------------
-- 装修公司表结构   `company_details`
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `company_details`;
CREATE TABLE `company_details`(
    `cid` INT(11) NOT NULL AUTO_INCREMENT,      #公司编号
    `cname` VARCHAR(128) DEFAULT NULL,          #公司名称
    `cicon_url` VARCHAR(128) DEFAULT NULL,      #公司商标
    `bg_img` VARCHAR(128) DEFAULT NULL,         #公司首页推荐背景图
    -- `intr` VARCHAR(128) DEFAULT NULL,        #公司简介
    `case_num` INT(32) DEFAULT NULL,            #公司案例数 各设计师案例数之和
    `praise` VARCHAR(64) DEFAULT NULL,          #公司所获好评率
    `bs_license` TINYINT(1) DEFAULT NULL,       #公司的营业执照是否认证 0/1
    `rz_license` TINYINT(1) DEFAULT NULL,       #公司是否为认证公司 0/1
    `deposit` VARCHAR(64) DEFAULT NULL,         #公司保证金
    `tel` VARCHAR(64) DEFAULT NULL,             #公司联系电话
    `address` VARCHAR(128) DEFAULT NULL,        #公司地址
    `seq_recommended` TINYINT(4) DEFAULT NULL,  #是否首页推荐 不推荐为0
    `bs_time` VARCHAR(128) DEFAULT NULL,        #公司营业时间
    `price_range` VARCHAR(64) DEFAULT NULL,     #公司业务承接价格范围
    `service_range` VARCHAR(256) DEFAULT NULL,  #公司业务承接服务范围
    `spec_style` VARCHAR(128) DEFAULT NULL,     #公司业务专长风格 北欧/中式...
    `cx_activity` VARCHAR(128) DEFAULT NULL,    #公司促销活动内容
    `quan_activity` VARCHAR(128) DEFAULT NULL,  #公司优惠活动内容
    PRIMARY KEY (`cid`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `company_details` VALUES (1,'佳瑞豪庭装饰','img/com/cicon_jrht.jpg','img/index/bg_img_jrht.jpg',6,'40%',1,1,'10000','17188384968','四川省成都市成华区万宇路1号紫提东郡6栋3楼',1,'周一~周日,每天09:00-19:00','暂未设置承接价位','都江堰市、彭州市、邛崃市、崇州市、金堂县、郫县、新津县、双流','简约、北欧、简欧','先装修后付款，免费赠送全房VR效果图！','到店即送2000元主材抵用券,签单赠送全房家具！');
INSERT INTO `company_details` VALUES (2,'佳馨达装饰','img/com/cicon_jxd.jpg','img/index/bg_img_jxd.jpg',2430,'94%',1,1,'150000','13183844947','四川省成都市锦江区成都市锦江区静沙南路18号沙河壹号A座25楼',2,'周一~周日,每天09:00-22:00','3-100万以上','都江堰市、彭州市、邛崃市、崇州市、金堂县、郫县、新津县、双流','现代、欧式、美式','10周年庆，签单送智能电器','到店送价值2880元汉尔顿净水器一台');
INSERT INTO `company_details` VALUES (3,'成都亿城装饰','img/com/cicon_cdyc.jpg','img/index/bg_img_cdyc.jpg',171,'86%',1,1,'10000','17138373525','四川省成都市青羊区西玉龙街6号',3,'周一~周日,每天09:00-22:00','暂未设置承接价位','崇州市、郫县、双流县、成华区、金牛区、锦江区、龙泉驿区、青羊','现代、欧式、美式','先装修，后付款','装修材料自助餐模式。到店签约赠送家电');
INSERT INTO `company_details` VALUES (4,'成都宽度空间','img/com/cicon_kdkj.jpg','img/index/bg_img_kdkj.jpg',2029,'90%',1,1,'0','17095131724','四川省成都市青羊区蜀金路1号金沙万瑞中心B座9层',4,'周一~周日,每天09:00-22:00','0-100万','双流县、成华区、金牛区、锦江区、龙泉驿区、青羊区、温江区、','现代、中式、北欧','签单赠送大名牌家电','签单赠送全程质检服务');
INSERT INTO `company_details` VALUES (5,'饰久达装饰','img/com/cicon_sjd.jpg','img/index/bg_img_sjd.jpg',583,'90%',1,1,'150000','13183844947','四川省成都市锦江区成都市锦江区静沙南路18号沙河壹号A座25楼',5,'周一~周日,每天09:00-22:00','3-100万以上','都江堰市、彭州市、邛崃市、崇州市、金堂县、郫县、新津县、双流','简约、中式、欧式','店铺预约客户可享同城免费接送服务！','合同金额达到39800元，送价值3980元汉斯顿净水器一台。');
INSERT INTO `company_details` VALUES (6,'逸馨居装饰','img/com/cicon_yxj.jpg','img/index/bg_img_yxj.jpg',24,'89%',1,1,'0','17138373717','四川省郫县郫县中信大道二段88号',6,'周一~周日,每天09:00-22:00','3-100万以上','都江堰市、彭州市、崇州市、郫县、双流县、金牛区、青羊区、温江','简约、现代、北欧','赠送别墅级施工工艺-WAGO连接器','清单报价自助式装修，装修满意再付款！');
INSERT INTO `company_details` VALUES (7,'兰戈空间装饰','img/com/cicon_lgsj.jpg',null,278,'91%',1,1,'0','13183843405','四川省双流县珠江路599号蓝光空港国际城7期3栋1单元1504',0,'周一~周日,每天09:00-18:00','3-100万以上','郫县、新津县、双流县、成华区、金牛区、锦江区、龙泉驿区、青羊','现代、美式、北欧','签单就送 iphone X','到店就送2888元主材抵扣劵');
INSERT INTO `company_details` VALUES (8,'方物元素装饰','img/com/cicon_fwys.jpg',null,43,'85%',1,1,'0','17138373583','四川省成都市龙泉驿区成龙大道中物国际3号楼702',0,'周一~周日,每天09:00-22:00','全部价位','都江堰市、彭州市、邛崃市、崇州市、金堂县、郫县、新津县、双流','现代、宜家、简欧','业主凭小区户型图进店咨询可获得爱玛特净水器一套','定装修即送1888-3888装修现金');

-- ----------------------------------------------------------
-- 各公司服务图片列表结构   `com_service_pic`
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `com_service_pic`;
CREATE TABLE `com_service_pic`(
    `pid` INT(11) NOT NULL AUTO_INCREMENT,      #图片编号
    `pic_url_1` VARCHAR(128) DEFAULT NULL,      #图片地址
    `pic_url_2` VARCHAR(128) DEFAULT NULL,      #图片地址
    `pic_url_3` VARCHAR(128) DEFAULT NULL,      #图片地址
    `pic_url_4` VARCHAR(128) DEFAULT NULL,      #图片地址
    `cid` INT(11) DEFAULT NULL,                 #图片所述服务所属的公司
    FOREIGN KEY(`cid`) REFERENCES company_details(`cid`),
    PRIMARY KEY(`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
INSERT INTO `com_service_pic` VALUES (NULL,'img/service_pic/sp_1.jpg','img/service_pic/sp_2.jpg','img/service_pic/sp_3.jpg','img/service_pic/sp_4.jpg',1);
INSERT INTO `com_service_pic` VALUES (NULL,'img/service_pic/sp_5.jpg','img/service_pic/sp_6.jpg','img/service_pic/sp_7.jpg','img/service_pic/sp_8.jpg',2);
INSERT INTO `com_service_pic` VALUES (NULL,'img/service_pic/sp_9.jpg','img/service_pic/sp_10.jpg','img/service_pic/sp_11.jpg','img/service_pic/sp_12.jpg',3);
INSERT INTO `com_service_pic` VALUES (NULL,'img/service_pic/sp_13.jpg','img/service_pic/sp_14.jpg','img/service_pic/sp_15.jpg','img/service_pic/sp_16.jpg',4);
INSERT INTO `com_service_pic` VALUES (NULL,'img/service_pic/sp_1.jpg','img/service_pic/sp_2.jpg','img/service_pic/sp_3.jpg','img/service_pic/sp_4.jpg',5);
INSERT INTO `com_service_pic` VALUES (NULL,'img/service_pic/sp_5.jpg','img/service_pic/sp_6.jpg','img/service_pic/sp_7.jpg','img/service_pic/sp_8.jpg',6);
INSERT INTO `com_service_pic` VALUES (NULL,'img/service_pic/sp_9.jpg','img/service_pic/sp_10.jpg','img/service_pic/sp_11.jpg','img/service_pic/sp_12.jpg',7);
INSERT INTO `com_service_pic` VALUES (NULL,'img/service_pic/sp_13.jpg','img/service_pic/sp_14.jpg','img/service_pic/sp_15.jpg','img/service_pic/sp_16.jpg',8);

-- ----------------------------------------------------------
-- 设计师表结构   `designer_details` (暂时不用)
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `designer_details`;
CREATE TABLE `designer_details`(
    `did` INT(11) NOT NULL AUTO_INCREMENT,      #设计师编号
    `dname` VARCHAR(128) DEFAULT NULL,          #设计师姓名
    `photo` VARCHAR(128) DEFAULT NULL,          #设计师照片
    `rank`  VARCHAR(64) DEFAULT NULL,           #设计师级别
    `d_case_num` VARCHAR(64) DEFAULT NULL,      #设计师设计案例数
    `resume` VARCHAR(256) DEFAULT NULL,         #设计师个人简介
    PRIMARY KEY(`did`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------------------------------------
-- 房产表结构   `house_details`
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `house_details`;
CREATE TABLE `house_details`(
    `hid` INT(11) NOT NULL AUTO_INCREMENT,      #房产编号
    `type` VARCHAR(64) DEFAULT NULL,            #房产户型(一居室...)
    `deco_style` VARCHAR(64) DEFAULT NULL,      #装修风格
    `area` VARCHAR(64) DEFAULT NULL,            #房产面积
    `cost` VARCHAR(64) DEFAULT NULL,            #房产造价
    `deco_way` VARCHAR(64) DEFAULT NULL,        #装修方式(全包、半包)
    `deco_time` VARCHAR(64) DEFAULT NULL,       #装修工期
    `location` VARCHAR(128) DEFAULT NULL,       #房产位置
    PRIMARY KEY(`hid`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `house_details` VALUES (1,'三居','新古典','80','7万元','全包','75天','众合北尚');
INSERT INTO `house_details` VALUES (2,'三居','现代','87','7万元','全包','75天','金科一城');
INSERT INTO `house_details` VALUES (3,'三居','中式','100','7万元','半包','65天','汇厦少城');
INSERT INTO `house_details` VALUES (4,'四居','欧式','120','12万元','全包','90天','南城都汇');
INSERT INTO `house_details` VALUES (5,'四居','现代','125','12万元','全包','90天','憩园');
INSERT INTO `house_details` VALUES (6,'三居','北欧','138','11万元','全包','80天','绿杨新邨');

-- ----------------------------------------------------------
-- 装修案例表结构   `case_details`
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `case_details`;
CREATE TABLE `case_details`(
    `case_id` INT(11) NOT NULL AUTO_INCREMENT,  #案例编号
    `case_name` VARCHAR(128) DEFAULT NULL,      #案例名称
    `cid` INT(11) DEFAULT NULL,                 #案例所属公司编号(外键约束)
    -- `did` INT(11) DEFAULT NULL,                 #案例设计师编号(外键约束)
    `hid` INT(11) DEFAULT NULL,                 #案例房产编号(外键约束)
    `case_img` VARCHAR(128) DEFAULT NULL,       #案例大图片
    FOREIGN KEY(`cid`) REFERENCES company_details(`cid`),
    -- FOREIGN KEY(`did`) REFERENCES designer_details(`did`),
    FOREIGN KEY(`hid`) REFERENCES house_details(`hid`),
    PRIMARY KEY(`case_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `case_details` VALUES (1,'新古典风格',4,1,'/img/case_pic/case_bg_pic_1.jpg');
INSERT INTO `case_details` VALUES (2,'现代风格',4,2,'/img/case_pic/case_bg_pic_2.jpg');
INSERT INTO `case_details` VALUES (3,'古典情怀',4,3,'/img/case_pic/case_bg_pic_3.jpg');
INSERT INTO `case_details` VALUES (4,'南城都汇',4,4,'/img/case_pic/case_bg_pic_4.jpg');
INSERT INTO `case_details` VALUES (5,'憩园公寓',4,5,'/img/case_pic/case_bg_pic_5.jpg');
INSERT INTO `case_details` VALUES (6,'绿杨新邨',4,6,'/img/case_pic/case_bg_pic_6.jpg');

-- ----------------------------------------------------------
-- 装修案例图片   `case_pic`
-- ----------------------------------------------------------

DROP TABLE IF EXISTS `case_pic`;
CREATE TABLE `case_pic`(
    `pid` INT(11) NOT NULL AUTO_INCREMENT,      #案例图片编号
    `case_id` INT(11) DEFAULT NULL,             #图片所属案例编号
    `bedroom_pic_1` VARCHAR(128) DEFAULT NULL,  #卧室图片1
    `bedroom_pic_2` VARCHAR(128) DEFAULT NULL,  #卧室图片2
    `res_pic` VARCHAR(128) DEFAULT NULL,        #餐厅图片
    `living_pic` VARCHAR(128) DEFAULT NULL,     #客厅图片
    `toilet_pic` VARCHAR(128) DEFAULT NULL,     #卫生间图片
    `kitchen_pic` VARCHAR(128) DEFAULT NULL,    #厨房图片
    FOREIGN KEY(`case_id`) REFERENCES case_details(`case_id`),
    PRIMARY KEY(`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `case_pic` VALUES (NULL,1,'/img/case_pic/bedroom_1.jpg','/img/case_pic/bedroom_2.jpg','/img/case_pic/restaurant_1.jpg','/img/case_pic/living_1.jpg',NULL,NULL);
INSERT INTO `case_pic` VALUES (NULL,2,'/img/case_pic/bedroom_3.jpg','/img/case_pic/bedroom_4.jpg','/img/case_pic/restaurant_2.jpg','/img/case_pic/living_2.jpg','/img/case_pic/toilet_1.jpg','/img/case_pic/kitchen_1.jpg');
INSERT INTO `case_pic` VALUES (NULL,3,'/img/case_pic/bedroom_5.jpg','/img/case_pic/bedroom_6.jpg','/img/case_pic/restaurant_3.jpg','/img/case_pic/living_3.jpg','/img/case_pic/toilet_2.jpg',NULL);
INSERT INTO `case_pic` VALUES (NULL,4,'/img/case_pic/bedroom_7.jpg','/img/case_pic/bedroom_8.jpg','/img/case_pic/restaurant_4.jpg','/img/case_pic/living_4.jpg',NULL,NULL);
INSERT INTO `case_pic` VALUES (NULL,5,'/img/case_pic/bedroom_9.jpg','/img/case_pic/bedroom_10.jpg','/img/case_pic/restaurant_5.jpg','/img/case_pic/living_5.jpg',NULL,NULL);
INSERT INTO `case_pic` VALUES (NULL,6,'/img/case_pic/bedroom_11.jpg','/img/case_pic/bedroom_12.jpg','/img/case_pic/restaurant_6.jpg','/img/case_pic/living_6.jpg','/img/case_pic/toilet_3.jpg',NULL);

-- ----------------------------------------------------------
-- 用户信息表结构   `user_info`
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info`(
    `uid` INT(11) NOT NULL AUTO_INCREMENT,      #用户编号
    `phone` VARCHAR(128) DEFAULT NULL,          #用户手机号
    `uname` VARCHAR(64) DEFAULT NULL,           #用户名
    `upwd` VARCHAR(64) DEFAULT NULL,            #用户密码
    PRIMARY KEY(`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `user_info` VALUES (NULL,'15946464646','dd1234',md5('1234z.'));
INSERT INTO `user_info` VALUES (NULL,'15956565656','dd2345',md5('1234z.'));
INSERT INTO `user_info` VALUES (NULL,'15976767676','dd3456',md5('1234z.'));
INSERT INTO `user_info` VALUES (NULL,'15986868686','dd4567',md5('1234z.'));

-- ----------------------------------------------------------
-- 用户收藏列表   `save_list_details`
-- ----------------------------------------------------------

