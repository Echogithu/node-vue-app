module.exports = app => {
  const router = require('express').Router()
  const mongoose = require('mongoose')
  // const News = require('../../models/Article')
  const Category = mongoose.model('Category')
  const Article = mongoose.model('Article')
  const Hero = mongoose.model('Hero')

  //新闻初始化
  router.get('/news/init',async(req,res)=>{
    const parent = await Category.findOne({
      name:'新闻分类'
    })
    const cats = await Category.find().where({
      parent: parent
    }).lean()
    const newsTitles = ["净化游戏环境声明及处罚公告（7月8日-7月14日）", "7月15日外挂专项打击公告", "7月15日“演员”惩罚名单", "世冠首周战果出炉，eStarPro率先挺进八强", "KCC小组赛快讯：一败难求！eStarPro猫神首秀李白打出30.5%伤害", "KCC小组赛快讯：出其不意 EMC复刻KPL套路赢下EDG.M一局", "KCC小组赛快讯：毫无悬念，RW侠稳定发挥零封KZ", "王者 X Meco丨你收到一封来自峡谷的甜Me情书", "世冠课代表：小组赛第五日比赛", "你是赛评师：eStarPro强势零封RNG.M，他们是世冠最强战队吗？", "KCC小组赛快讯：势如破竹 eStar零封RNG.M展现世冠最高战力", "新皮肤爆料丨穿上这件免费的衣服，你就是“队”的人！", "KCC小组赛快讯：虽败犹荣 境外平头哥GOG孙尚香体系打懵QGhappy", "KCC小组赛快讯：有勇有谋 Nova零封EMC展现冠军风采", "王者 X Meco丨你收到一封来自峡谷的甜Me情书", "新皮肤爆料丨穿上这件免费的衣服，你就是“队”的人！", "夏日盛典丨孙膑2.0改造进度曝光，小乔星元免费拿！", "新皮肤爆料丨大秦宣太后优化进度曝光，玩趣恶龙惊现峡谷~", "星元皮肤爆料 | 小乔百变泳装，测测你最适合哪一款！", "【大神问答】donny、猫神、孤影、小潘潘降临微社区，教你如何玩转星辰之子-曜", "庆全球注册破2亿，QQ飞车手游登录送绝版赛车！", "美术优化 | 多款模型品质升级，可爱不减，细节满分！", "新秀音乐计划 | 王者为你出CD，吕布新秀就是你！", "新皮肤爆料丨孔雀开屏，雀灵翩飞！峡谷最“绣”的皮肤来了~", "新英雄爆料丨即将苏醒！浣纱溪边的沉鱼少女！", "鲁班七号-狮舞东方定制非遗文化狮头", "王者人生×王者荣耀 | 特权强势升级，来做王者峡谷最靓的仔！", "稷下星之队集结 快手官号回馈超值福利", "姐姐镜剪影曝光，曜往事大揭秘！", "7月12日全服不停机更新公告", "心愿单升级完毕 104个小区开放功能体验", "云霓雀翎皮肤音效及模型异常说明公告", "【正式服】“稷下星之队”版本异常问题说明", "净化游戏环境声明及处罚公告（7月8日-7月14日）", "7月15日外挂专项打击公告", "7月15日“演员”惩罚名单", "7月12日体验服停机更新公告", "【稷下星之队】建议更新版本上架公告", "助力世冠奖金池 领千万大回馈活动今日开启", "【QQ手游海浪杯微赛事】开启公告", "心愿商城暂时关闭功能升级公告", "7月9日体验服停机更新公告", "地狱火皮肤音效异常丢失说明公告", "7月9日全服不停机更新公告", "王者 X Meco丨你收到一封来自峡谷的甜Me情书", "首款世冠专属皮肤明日0点开售 有助力回馈福利即将开启", "迎王者荣耀世界冠军杯 参与活动赢惊喜好礼", "稷下精彩活动明日到来 任你徜徉王者峡谷", "稷下星之队集结 新版本超值福利回馈", "【曜眼星辰 为你点亮】活动公告", "恭喜eStarPro捧起银龙杯 赛末冲刺惊喜礼不断", "【稷下的邀约】活动公告", "活力夏日活动周 王者峡谷好礼多", "王者大陆的端午宝藏活动公告", "峡谷庆端午 惊喜礼不断", "【场里场外，一起开黑】感恩礼包放送", "KPL总决赛来临之际 场里场外一起开黑/观赛活动开启！", "2019KPL春季赛总决赛即将开战 福利活动来助阵", "KPL限定皮肤天狼狩猎者全服6折特权开启！", "王者荣耀世界冠军杯荣耀来袭，KPL赛区选拔赛谁能突围而出？", "城市赛海选最后一周，开赛季活动限时福利强势来袭！", "城市赛海选尾声，多城开赛抓紧来战！", "王者荣耀亮相2019全球电竞运动领袖峰会暨腾讯电竞年度发布会", "后半段赛程持续发力，城市赛第十二周将有哪些精彩赛事？", "高校排行榜挑战最后一周，最强校队即将诞生", "高校排行榜挑战接近尾声，最强校队桂冠将花落谁家？", "今日17:30，2019KPL春季赛总决赛再战西安！", "【微赛事·王者城市公会赛】闲云专场首周火热开赛，天才在左专场即将接力开赛", "世界冠军杯正赛赛制公布，目标：世界冠军！", "世冠KPL赛区战队出征名单公布 王者，无惧挑战！", "2019年KPL春季赛总决赛6月15日17:30，再战西安！", "【微赛事·王者城市公会赛】闲云、NGA战队陪你参与挑战！", "KPL春季赛总决赛助威及竞猜活动公告", "KPL春季总决赛今日15点30打响！eStarPro与RNG.M谁将问鼎巅峰？", "【昨日回顾】世冠赛场上的每位选手，都会闪闪发亮", "【昨日回顾】世冠赛场上的每位选手，都会闪闪发亮", "世冠首周战果出炉，eStarPro率先挺进八强", "你是赛评师：猫神李白强势出击，你最爱他的哪个英雄？", "KCC小组赛快讯：一败难求！eStarPro猫神首秀李白打出30.5%伤害", "KCC小组赛快讯：出其不意 EMC复刻KPL套路赢下EDG.M一局", "KCC小组赛快讯：毫无悬念，RW侠稳定发挥零封KZ", "世冠课代表：小组赛第五日比赛"]
    const newsList = newsTitles.map(title => {
      const randomCats = cats.slice(0).sort((a,b) => Math.random()-0.5)
      return {
        categories: randomCats.slice(0,2),
        title:title
      }
    })
    await Article.deleteMany({})
    await Article.insertMany(newsList)
    res.send(newsList)
  })


  //新闻展示
  router.get('/news/list',async(req,res) => {
    // const parent = await Category.findOne({
    //   name:'新闻分类'
    // }).populate({
    //   path:'children',
    //   populate:{
    //     path:'newsList'
    //   }
    // }).lean()

    const parent = await Category.findOne({
      name:'新闻分类'
    })
    //聚合查询
    const cats = await Category.aggregate([
      //过滤数据
      {$match:{parent:parent._id}},
      //关联查询
      {
        $lookup:{
          from:'articles',
          localField:'_id',
          foreignField:'categories',
          as:'newsList'
        }
      },
      {
        $addFields:{
          newsList: {$slice:['$newsList',5]}
        }
      }
    ])

    const subCats = cats.map(v=>v._id)

    cats.unshift({
      name:'热门',
      newsList: await Article.find().where({
        categories:{$in:subCats}
      }).populate('categories').limit(5).lean()
    })
    
    cats.map(cat=>{
      cat.newsList.map(news=>{
        news.categoryName = cat.name === '热门' ? news.categories[0].name :cat.name
        return news
      })
      return cat
    })
    res.send(cats)
  })

  //导入英雄数据
  router.get('/heroes/init', async(req,res)=>{
    await Hero.deleteMany({})
    const rawData = [{"name":"热门","heroes":[{"name":"孙悟空","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"},{"name":"后羿","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg"},{"name":"鲁班七号","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg"},{"name":"铠","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"},{"name":"孙尚香","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg"},{"name":"亚瑟","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"},{"name":"甄姬","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg"},{"name":"韩信","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg"},{"name":"庄周","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg"},{"name":"安琪拉","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg"}]},{"name":"战士","heroes":[{"name":"赵云","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg"},{"name":"钟无艳","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg"},{"name":"吕布","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"},{"name":"曹操","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/128/128.jpg"},{"name":"典韦","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg"},{"name":"宫本武藏","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/130/130.jpg"},{"name":"达摩","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg"},{"name":"老夫子","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/139/139.jpg"},{"name":"关羽","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/140/140.jpg"},{"name":"露娜","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg"},{"name":"花木兰","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg"},{"name":"亚瑟","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"},{"name":"孙悟空","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"},{"name":"刘备","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/170/170.jpg"},{"name":"杨戬","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/178/178.jpg"},{"name":"雅典娜","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/183/183.jpg"},{"name":"哪吒","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/180/180.jpg"},{"name":"铠","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"},{"name":"狂铁","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/503/503.jpg"},{"name":"李信","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg"},{"name":"盘古","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/529/529.jpg"},{"name":"曜","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/522/522.jpg"}]},{"name":"法师","heroes":[{"name":"小乔","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/106/106.jpg"},{"name":"墨子","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg"},{"name":"妲己","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg"},{"name":"嬴政","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/110/110.jpg"},{"name":"高渐离","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/115/115.jpg"},{"name":"扁鹊","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/119/119.jpg"},{"name":"芈月","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg"},{"name":"周瑜","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/124/124.jpg"},{"name":"甄姬","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg"},{"name":"武则天","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/136/136.jpg"},{"name":"貂蝉","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg"},{"name":"安琪拉","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg"},{"name":"姜子牙","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg"},{"name":"王昭君","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/152/152.jpg"},{"name":"张良","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/156/156.jpg"},{"name":"不知火舞","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg"},{"name":"钟馗","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg"},{"name":"诸葛亮","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/190/190.jpg"},{"name":"干将莫邪","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/182/182.jpg"},{"name":"女娲","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/179/179.jpg"},{"name":"杨玉环","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg"},{"name":"弈星","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/197/197.jpg"},{"name":"米莱狄","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/504/504.jpg"},{"name":"沈梦溪","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/312/312.jpg"},{"name":"上官婉儿","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg"},{"name":"嫦娥","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg"}]},{"name":"坦克","heroes":[]},{"name":"刺客","heroes":[]},{"name":"射手","heroes":[]},{"name":"辅助","heroes":[]}]
    for(let cat of rawData) {
      if(cat.name === '热门'){
        continue
      }

      //找到当前分类在数据库中对应的数据
      const category = await Category.findOne({
        name:cat.name
      })

      cat.heroes = cat.heroes.map(hero => {
        hero.categories = [category]
        return hero
      })
      //录入英雄
      await Hero.insertMany(cat.heroes)
    }

    res.send(await Hero.find())
  })



  //英雄列表接口
  router.get('/heroes/list',async(req,res) => {
    const parent = await Category.findOne({
      name:'英雄分类'
    })
    //聚合查询
    const cats = await Category.aggregate([
      //过滤数据
      {$match:{parent:parent._id}},
      //关联查询
      {
        $lookup:{
          from:'heroes',
          localField:'_id',
          foreignField:'categories',
          as:'heroList'
        }
      },
      
    ])

    const subCats = cats.map(v=>v._id)

    cats.unshift({
      name:'热门',
      heroList: await Hero.find().where({
        categories:{$in:subCats}
      }).limit(10).lean()
    })
    
    res.send(cats)
  })

  //文章详情
  router.get('/articles/:id',async(req,res)=>{
    const data = await Article.findById(req.params.id).lean()
    data.related = await Article.find().where({
      categories:{$in:data.categories}
    }).limit(2)
    res.send(data)
  })

  //英雄详情
  

  app.use('/web/api',router)
}