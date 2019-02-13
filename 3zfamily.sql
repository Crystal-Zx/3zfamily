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

INSERT INTO `company_details` VALUES (1,'成都宽度空间','img/com/cicon_kdkj.jpg','img/index/bg_img_kdkj.jpg',2029,'90%',1,1,'0','17095131724','四川省成都市青羊区蜀金路1号金沙万瑞中心B座9层',1,'周一~周日,每天09:00-22:00','0-100万','双流县、成华区、金牛区、锦江区、龙泉驿区、青羊区、温江区、','现代、中式、北欧','签单赠送大名牌家电','签单赠送全程质检服务');
INSERT INTO `company_details` VALUES (2,'佳馨达装饰','img/com/cicon_jxd.jpg','img/index/bg_img_jxd.jpg',2430,'94%',1,1,'150000','13183844947','四川省成都市锦江区成都市锦江区静沙南路18号沙河壹号A座25楼',2,'周一~周日,每天09:00-22:00','3-100万以上','都江堰市、彭州市、邛崃市、崇州市、金堂县、郫县、新津县、双流','现代、欧式、美式','10周年庆，签单送智能电器','到店送价值2880元汉尔顿净水器一台');
INSERT INTO `company_details` VALUES (3,'成都亿城装饰','img/com/cicon_cdyc.jpg','img/index/bg_img_cdyc.jpg',171,'86%',1,1,'10000','17138373525','四川省成都市青羊区西玉龙街6号',3,'周一~周日,每天09:00-22:00','暂未设置承接价位','崇州市、郫县、双流县、成华区、金牛区、锦江区、龙泉驿区、青羊','现代、欧式、美式','先装修，后付款','装修材料自助餐模式。到店签约赠送家电');
INSERT INTO `company_details` VALUES (4,'佳瑞豪庭装饰','img/com/cicon_jrht.jpg','img/index/bg_img_jrht.jpg',6,'40%',1,1,'10000','17188384968','四川省成都市成华区万宇路1号紫提东郡6栋3楼',4,'周一~周日,每天09:00-19:00','暂未设置承接价位','都江堰市、彭州市、邛崃市、崇州市、金堂县、郫县、新津县、双流','简约、北欧、简欧','先装修后付款，免费赠送全房VR效果图！','到店即送2000元主材抵用券,签单赠送全房家具！');
INSERT INTO `company_details` VALUES (5,'饰久达装饰','img/com/cicon_sjd.jpg','img/index/bg_img_sjd.jpg',583,'90%',1,1,'150000','13183844947','四川省成都市锦江区成都市锦江区静沙南路18号沙河壹号A座25楼',5,'周一~周日,每天09:00-22:00','3-100万以上','都江堰市、彭州市、邛崃市、崇州市、金堂县、郫县、新津县、双流','简约、中式、欧式','店铺预约客户可享同城免费接送服务！','合同金额达到39800元，送价值3980元汉斯顿净水器一台。');
INSERT INTO `company_details` VALUES (6,'逸馨居装饰','img/com/cicon_yxj.jpg','img/index/bg_img_yxj.jpg',24,'89%',1,1,'0','17138373717','四川省郫县郫县中信大道二段88号',6,'周一~周日,每天09:00-22:00','3-100万以上','都江堰市、彭州市、崇州市、郫县、双流县、金牛区、青羊区、温江','简约、现代、北欧','赠送别墅级施工工艺-WAGO连接器','清单报价自助式装修，装修满意再付款！');
INSERT INTO `company_details` VALUES (7,'兰戈空间装饰','img/com/cicon_lgsj.jpg','img/index/bg_img_lgkj.jpg',278,'91%',1,1,'0','13183843405','四川省双流县珠江路599号蓝光空港国际城7期3栋1单元1504',0,'周一~周日,每天09:00-18:00','3-100万以上','郫县、新津县、双流县、成华区、金牛区、锦江区、龙泉驿区、青羊','现代、美式、北欧','签单就送 iphone X','到店就送2888元主材抵扣劵');
INSERT INTO `company_details` VALUES (8,'方物元素装饰','img/com/cicon_fwys.jpg','img/index/bg_img_fwys.jpg',43,'85%',1,1,'0','17138373583','四川省成都市龙泉驿区成龙大道中物国际3号楼702',0,'周一~周日,每天09:00-22:00','全部价位','都江堰市、彭州市、邛崃市、崇州市、金堂县、郫县、新津县、双流','现代、宜家、简欧','业主凭小区户型图进店咨询可获得爱玛特净水器一套','定装修即送1888-3888装修现金');

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
-- 设计师表结构   `designer_details` 
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `designer_details`;
CREATE TABLE `designer_details`(
    `did` INT(11) NOT NULL AUTO_INCREMENT,      #设计师编号
    `dname` VARCHAR(128) DEFAULT NULL,          #设计师姓名
    `photo` VARCHAR(128) DEFAULT NULL,          #设计师照片
    `rank`  VARCHAR(64) DEFAULT NULL,           #设计师级别
    `years`  VARCHAR(64) DEFAULT NULL,          #设计师资历年限
    `d_case_num` VARCHAR(64) DEFAULT NULL,      #设计师设计案例数
    `cid` INT(11) DEFAULT NULL,                 #设计师所属公司编号(外键约束) 
    FOREIGN KEY(`cid`) REFERENCES company_details(`cid`),
    PRIMARY KEY(`did`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
INSERT INTO `designer_details` VALUES (NULL,'付春梅','img/company_details/d1_1.jpg','首席设计师',10,124,1);
INSERT INTO `designer_details` VALUES (NULL,'刘丽','img/company_details/d1_2.jpg','首席设计师',7,123,1);
INSERT INTO `designer_details` VALUES (NULL,'江涵','img/company_details/d1_3.jpg','首席设计师',6,145,1);
INSERT INTO `designer_details` VALUES (NULL,'张利洪','img/company_details/d1_4.jpg','首席设计师',6,134,1);
INSERT INTO `designer_details` VALUES (NULL,'桑银','img/company_details/d1_5.jpg','首席设计师',6,149,1);
INSERT INTO `designer_details` VALUES (NULL,'林彬','img/company_details/d2_1.jpg','设计总监',10,76,2);
INSERT INTO `designer_details` VALUES (NULL,'孙保凯','img/company_details/d2_2.jpg','首席设计师',8,172,2);
INSERT INTO `designer_details` VALUES (NULL,'毛愿','img/company_details/d2_3.jpg','首席设计师',9,155,2);
INSERT INTO `designer_details` VALUES (NULL,'严寒','img/company_details/d2_4.jpg','首席设计师',7,111,2);
INSERT INTO `designer_details` VALUES (NULL,'潘冰','img/company_details/d2_5.jpg','首席设计师',12,125,2);
INSERT INTO `designer_details` VALUES (NULL,'李沅鸿','img/company_details/d3_1.jpg','首席设计师',8,29,3);
INSERT INTO `designer_details` VALUES (NULL,'刘艳','img/company_details/d3_2.jpg','首席设计师',5,34,3);
INSERT INTO `designer_details` VALUES (NULL,'潘冰','img/company_details/d3_3.jpg','首席设计师',12,125,3);
INSERT INTO `designer_details` VALUES (NULL,'何恒','img/company_details/d3_4.jpg','首席设计师',5,20,3);
INSERT INTO `designer_details` VALUES (NULL,'白虎','img/company_details/d4_1.jpg','设计总监',10,35,4);
INSERT INTO `designer_details` VALUES (NULL,'田素华','img/company_details/d4_2.jpg','首席设计师',6,31,4);
INSERT INTO `designer_details` VALUES (NULL,'赵君桥','img/company_details/d4_3.jpg','首席设计师',6,11,4);
INSERT INTO `designer_details` VALUES (NULL,'康涛涛','img/company_details/d4_4.jpg','首席设计师',6,40,4);
INSERT INTO `designer_details` VALUES (NULL,'毛玉全','img/company_details/d4_5.jpg','首席设计师',6,12,4);

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
INSERT INTO `house_details` VALUES (7,'三居','美式','108','15万元','全包','60天','中加水岸');
INSERT INTO `house_details` VALUES (8,'四居','东南亚','150','15万元','全包','60天','万科城市花园');
INSERT INTO `house_details` VALUES (9,'四居','北欧','112','11万元','全包','60天','成外雅庭');
INSERT INTO `house_details` VALUES (10,'三居','新古典','120','12万元','全包','60天','香缇华府');
INSERT INTO `house_details` VALUES (11,'三居','新古典','110','11万元','全包','60天','紫华苑');
INSERT INTO `house_details` VALUES (12,'四居','现代','120','12万元','全包','60天','保利紫薇花语');
-- 以下为假数据（无对应案例图片）
INSERT INTO `house_details` VALUES (13,'三居','地中海','120','12万元','全包','60天','美好城');
INSERT INTO `house_details` VALUES (14,'三居','北欧','100','10万元','全包','60天','枫树湾');
INSERT INTO `house_details` VALUES (15,'三居','现代','100','12万元','全包','90天','蓝光君悦府');
INSERT INTO `house_details` VALUES (16,'三居','现代','100','12万元','全包','90天','华侨城四海锦园');
INSERT INTO `house_details` VALUES (17,'四居','现代','129','12万元','全包','90天','罗兰小镇');
INSERT INTO `house_details` VALUES (18,'二居','北欧','75','7万元','全包','60天','香月湖');
INSERT INTO `house_details` VALUES (19,'三居','美式','180','16万元','半包','180天','国奥村');
INSERT INTO `house_details` VALUES (20,'四居','现代','147','14万元','半包','120天','南都公馆');
INSERT INTO `house_details` VALUES (21,'复式','现代','180','17万元','半包','160天','南湖国际');
INSERT INTO `house_details` VALUES (22,'三居','简约','116','9万元','全包','90天','米兰香洲');
INSERT INTO `house_details` VALUES (23,'三居','北欧','120','15万元','全包','100天','国栋南园');
INSERT INTO `house_details` VALUES (24,'二居','北欧','89','10万元','全包','100天','中海翠屏湾');

-- ----------------------------------------------------------
-- 装修案例表结构   `case_details`
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `case_details`;
CREATE TABLE `case_details`(
    `case_id` INT(11) NOT NULL AUTO_INCREMENT,  #案例编号
    `case_name` VARCHAR(128) DEFAULT NULL,      #案例名称
    `cid` INT(11) DEFAULT NULL,                 #案例所属公司编号(外键约束)
    `did` INT(11) DEFAULT NULL,                 #案例设计师编号(外键约束)
    `hid` INT(11) DEFAULT NULL,                 #案例房产编号(外键约束)
    `case_img` VARCHAR(128) DEFAULT NULL,       #案例大图片
    FOREIGN KEY(`cid`) REFERENCES company_details(`cid`),
    FOREIGN KEY(`did`) REFERENCES designer_details(`did`),
    FOREIGN KEY(`hid`) REFERENCES house_details(`hid`),
    PRIMARY KEY(`case_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `case_details` VALUES (1,'新古典风格',1,1,1,'img/case_pic/case_bg_pic_1.jpg');
INSERT INTO `case_details` VALUES (2,'现代风格',1,2,2,'img/case_pic/case_bg_pic_2.jpg');
INSERT INTO `case_details` VALUES (3,'古典情怀',1,3,3,'img/case_pic/case_bg_pic_3.jpg');
INSERT INTO `case_details` VALUES (4,'南城都汇',1,4,4,'img/case_pic/case_bg_pic_4.jpg');
INSERT INTO `case_details` VALUES (5,'憩园公寓',1,5,5,'img/case_pic/case_bg_pic_5.jpg');
INSERT INTO `case_details` VALUES (6,'绿杨新邨',1,1,6,'img/case_pic/case_bg_pic_6.jpg');
INSERT INTO `case_details` VALUES (7,'中加水岸',2,6,7,'img/case_pic/case_bg_pic_7.jpg');
INSERT INTO `case_details` VALUES (8,'万科城市花园',2,7,8,'img/case_pic/case_bg_pic_8.jpg');
INSERT INTO `case_details` VALUES (9,'成外雅庭',2,8,9,'img/case_pic/case_bg_pic_9.jpg');
INSERT INTO `case_details` VALUES (10,'香缇华府',2,9,10,'img/case_pic/case_bg_pic_10.jpg');
INSERT INTO `case_details` VALUES (11,'紫华苑',2,10,11,'img/case_pic/case_bg_pic_11.jpg');
INSERT INTO `case_details` VALUES (12,'保利紫薇花语',2,8,12,'img/case_pic/case_bg_pic_12.jpg');
-- 以下为凑图的假数据（无对应案例图片）
INSERT INTO `case_details` VALUES (13,'美好城',3,11,13,'img/case_pic/case_bg_pic_13.jpg');
INSERT INTO `case_details` VALUES (14,'枫树湾',3,12,14,'img/case_pic/case_bg_pic_14.jpg');
INSERT INTO `case_details` VALUES (15,'蓝光君悦府',3,13,15,'img/case_pic/case_bg_pic_15.jpg');
INSERT INTO `case_details` VALUES (16,'华侨城四海锦园',3,14,16,'img/case_pic/case_bg_pic_16.jpg');
INSERT INTO `case_details` VALUES (17,'罗兰小镇',3,12,17,'img/case_pic/case_bg_pic_17.jpg');
INSERT INTO `case_details` VALUES (18,'香月湖',3,11,18,'img/case_pic/case_bg_pic_18.jpg');
INSERT INTO `case_details` VALUES (19,'国奥村',4,15,19,'img/case_pic/case_bg_pic_19.jpg');
INSERT INTO `case_details` VALUES (20,'南都公馆',4,16,20,'img/case_pic/case_bg_pic_20.jpg');
INSERT INTO `case_details` VALUES (21,'南湖国际',4,17,21,'img/case_pic/case_bg_pic_21.jpg');
INSERT INTO `case_details` VALUES (22,'米兰香洲',4,18,22,'img/case_pic/case_bg_pic_22.jpg');
INSERT INTO `case_details` VALUES (23,'国栋南园',4,19,23,'img/case_pic/case_bg_pic_23.jpg');
INSERT INTO `case_details` VALUES (24,'中海翠屏湾',4,16,24,'img/case_pic/case_bg_pic_24.jpg');

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

INSERT INTO `case_pic` VALUES (NULL,1,'img/case_pic/bedroom_1.jpg','img/case_pic/bedroom_2.jpg','img/case_pic/restaurant_1.jpg','img/case_pic/living_1.jpg',NULL,NULL);
INSERT INTO `case_pic` VALUES (NULL,2,'img/case_pic/bedroom_3.jpg','img/case_pic/bedroom_4.jpg','img/case_pic/restaurant_2.jpg','img/case_pic/living_2.jpg','img/case_pic/toilet_1.jpg','img/case_pic/kitchen_1.jpg');
INSERT INTO `case_pic` VALUES (NULL,3,'img/case_pic/bedroom_5.jpg','img/case_pic/bedroom_6.jpg','img/case_pic/restaurant_3.jpg','img/case_pic/living_3.jpg','img/case_pic/toilet_2.jpg',NULL);
INSERT INTO `case_pic` VALUES (NULL,4,'img/case_pic/bedroom_7.jpg','img/case_pic/bedroom_8.jpg','img/case_pic/restaurant_4.jpg','img/case_pic/living_4.jpg',NULL,NULL);
INSERT INTO `case_pic` VALUES (NULL,5,'img/case_pic/bedroom_9.jpg','img/case_pic/bedroom_10.jpg','img/case_pic/restaurant_5.jpg','img/case_pic/living_5.jpg',NULL,NULL);
INSERT INTO `case_pic` VALUES (NULL,6,'img/case_pic/bedroom_11.jpg','img/case_pic/bedroom_12.jpg','img/case_pic/restaurant_6.jpg','img/case_pic/living_6.jpg','img/case_pic/toilet_3.jpg',NULL);
INSERT INTO `case_pic` VALUES (NULL,7,'img/case_pic/bedroom_13.jpg','img/case_pic/bedroom_14.jpg','img/case_pic/restaurant_7.jpg','img/case_pic/living_7.jpg',NULL,NULL);
INSERT INTO `case_pic` VALUES (NULL,8,'img/case_pic/bedroom_15.jpg','img/case_pic/bedroom_16.jpg','img/case_pic/restaurant_8.jpg','img/case_pic/living_8.jpg',NULL,NULL);
INSERT INTO `case_pic` VALUES (NULL,9,'img/case_pic/bedroom_17.jpg','img/case_pic/bedroom_18.jpg','img/case_pic/restaurant_9.jpg','img/case_pic/living_9.jpg',NULL,NULL);
INSERT INTO `case_pic` VALUES (NULL,10,'img/case_pic/bedroom_19.jpg','img/case_pic/bedroom_20.jpg','img/case_pic/restaurant_10.jpg','img/case_pic/living_10.jpg',NULL,NULL);
INSERT INTO `case_pic` VALUES (NULL,11,'img/case_pic/bedroom_21.jpg','img/case_pic/bedroom_22.jpg','img/case_pic/restaurant_11.jpg','img/case_pic/living_11.jpg',NULL,NULL);
INSERT INTO `case_pic` VALUES (NULL,12,'img/case_pic/bedroom_23.jpg','img/case_pic/bedroom_24.jpg','img/case_pic/restaurant_12.jpg','img/case_pic/living_12.jpg','img/case_pic/toilet_4.jpg',NULL);

-- ----------------------------------------------------------
-- 用户信息表结构   `user_info`
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info`(
    `uid` INT(11) NOT NULL AUTO_INCREMENT,      #用户编号
    `phone` VARCHAR(128) DEFAULT NULL,          #用户手机号
    `uname` VARCHAR(64) DEFAULT NULL,           #用户名
    `upwd` VARCHAR(64) DEFAULT NULL,            #用户密码
    `avatar` VARCHAR(256) DEFAULT NULL,         #用户头像路径
    PRIMARY KEY(`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `user_info` VALUES (NULL,'15946464646','dd1234',md5('1234z.'),'img/avatar/1.jpg');
INSERT INTO `user_info` VALUES (NULL,'15956565656','dd2345',md5('1234z.'),'img/avatar/2.jpg');
INSERT INTO `user_info` VALUES (NULL,'15976767676','dd3456',md5('1234z.'),'img/avatar/3.jpg');
INSERT INTO `user_info` VALUES (NULL,'15986868686','dd4567',md5('1234z.'),'img/avatar/4.jpg');

-- ----------------------------------------------------------
-- 用户收藏列表   `collect_list`
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `collect_list`;
CREATE TABLE `collect_list`(
    `lid` INT(11) NOT NULL AUTO_INCREMENT,      #列表编号
    `cid` INT(11) DEFAULT NULL,                 #公司编号
    `cname` VARCHAR(128) DEFAULT NULL,          #公司名称
    `cicon_url` VARCHAR(128) DEFAULT NULL,      #公司商标
    `case_num` INT(32) DEFAULT NULL,            #公司案例数 各设计师案例数之和
    `praise` VARCHAR(64) DEFAULT NULL,          #公司所获好评率
    `tel` VARCHAR(64) DEFAULT NULL,             #公司联系电话
    `uid` INT(11) DEFAULT NULL,                 #用户编号
    FOREIGN KEY(`uid`) REFERENCES user_info(`uid`),
    PRIMARY KEY(`lid`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
