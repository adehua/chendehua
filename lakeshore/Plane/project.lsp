<project name="飞行游戏" stagewidth="511" stageheight="762" startscenename="MainScene">
<objects>
<type uiname="System" uitype="AISystem"/>
<type uiname="MainScene" uitype="Scene"/>
<type uiname="背景层" uitype="Layer"/>
<type uiname="背景" uitype="AISprite"/>
<type uiname="UI层" uitype="Layer"/>
<type uiname="AISprite9" uitype="AISprite"/>
<type uiname="开始游戏" uitype="AIButton"/>
<type uiname="GameScene" uitype="Scene"/>
<type uiname="背景层" uitype="Layer"/>
<type uiname="滚动背景" uitype="AISprite"/>
<type uiname="物体层" uitype="Layer"/>
<type uiname="英雄" uitype="AISprite"/>
<type uiname="英雄子弹" uitype="AISprite"/>
<type uiname="上方物体生产基地" uitype="AISprite"/>
<type uiname="敌人" uitype="AISprite"/>
<type uiname="敌人子弹" uitype="AISprite"/>
<type uiname="BOSS" uitype="AISprite"/>
<type uiname="BOSS子弹" uitype="AISprite"/>
<type uiname="英雄开火音效" uitype="AIAudio"/>
<type uiname="背景音效" uitype="AIAudio"/>
<type uiname="敌人死亡音效" uitype="AIAudio"/>
<type uiname="英雄死亡音效" uitype="AIAudio"/>
<type uiname="GameOverScene" uitype="Scene"/>
<type uiname="背景层" uitype="Layer"/>
<type uiname="游戏结束背景1" uitype="AISprite"/>
<type uiname="游戏结束背景2" uitype="AISprite"/>
<type uiname="对象层" uitype="Layer"/>
<type uiname="游戏结束标题" uitype="AISprite"/>
<type uiname="再来一次" uitype="AIButton"/>
<type uiname="分数" uitype="AITextField"/>
<type uiname="HP标题图片" uitype="AISprite"/>
<type uiname="英雄生命" uitype="AITextField"/>
<type uiname="血" uitype="AISprite"/>
<type uiname="AISprite73" uitype="AISprite"/>
<type uiname="排行榜" uitype="AIButton"/>
<type uiname="返回菜单" uitype="AIButton"/>
</objects>
<eventsheet>
<sheet name="GameSceneEventSheet" targetscene="GameScene">
<event name="英雄开火" enable="true" relation="1">
<description>开火时播放开火声音</description>
<conditons>
<condition type="EveryXSecondsEvent" targetuiname="System" targetuitype="AISystem" >
<properties>
<p key="interval" value="0.2" valuetype="any" edittype="any">
<description>时间间隔（单位：秒）</description>
</p>
</properties>
</condition>
</conditons>
<actions>
<action type="spawn" targetuiname="英雄" targetuitype="AISprite" >
<properties>
<p key="10" uiname="英雄子弹" uitype="AISprite" valuetype="string"  edittype="instance">
<description>请选择要创建的对象的实例类型</description>
</p>
<p key="11" value="0" valuetype="any" edittype="any">
<description>要创建的对象所在的层次（类型：数字，数字越大，层次越高，高层次覆盖低层次）</description>
</p>
<p key="12" value="0" valuetype="any" edittype="any">
<description>相对于当前实例注册点所在的水平偏移坐标值</description>
</p>
<p key="13" value="-30" valuetype="any" edittype="any">
<description>相对于当前实例注册点所在的垂直偏移坐标值</description>
</p>
</properties>
</action>
<action type="play" targetuiname="英雄开火音效" targetuitype="AIAudio" >
<properties>
<p key="1" value="resource/sound/bullet.mp3" valuetype="any" edittype="sound">
<description>音乐文件路径</description>
</p>
<p key="2" value="1" valuetype="any" edittype="any">
<description>声音循环次数</description>
</p>
<p key="3" value="1" valuetype="any" edittype="any">
<description>音量大小（值从0~1之间）</description>
</p>
</properties>
</action>
</actions>
<subevent>
</subevent>
</event>
<event name="更新得分" enable="true" relation="1">
<description>更新英雄的分数，杀一个得一分</description>
<conditons>
<condition type="EveryTickEvent" targetuiname="System" targetuitype="AISystem" >
<properties>
</properties>
</condition>
</conditons>
<actions>
<action type="setText" targetuiname="分数" targetuitype="AITextField" >
<properties>
<p key="42" value="'得分:'+英雄.score" valuetype="any" edittype="any">
<description>设置文本内容</description>
</p>
</properties>
</action>
</actions>
<subevent>
</subevent>
</event>
<event name="更新英雄生命值" enable="true" relation="1">
<description></description>
<conditons>
<condition type="EveryTickEvent" targetuiname="System" targetuitype="AISystem" >
<properties>
</properties>
</condition>
</conditons>
<actions>
<action type="setText" targetuiname="英雄生命" targetuitype="AITextField" >
<properties>
<p key="42" value="':'+英雄.HP" valuetype="any" edittype="any">
<description>设置文本内容</description>
</p>
</properties>
</action>
</actions>
<subevent>
</subevent>
</event>
<event name="英雄子弹打到敌人" enable="true" relation="1">
<description>打到后减敌人3生命</description>
<conditons>
<condition type="OnCollisionWithOtherObjectEvent" targetuiname="英雄子弹" targetuitype="AISprite" >
<properties>
<p key="object" uiname="敌人" uitype="AISprite" valuetype="string"  edittype="instance">
<description>碰撞的对象</description>
</p>
</properties>
</condition>
</conditons>
<actions>
<action type="subtractFrom" targetuiname="敌人" targetuitype="AISprite" >
<properties>
<p key="7" propertyname="HP" valuetype="string"  edittype="variable">
<description>请选择当前某个实例变量</description>
</p>
<p key="8" value="10" valuetype="any" edittype="any">
<description>当前实例属性值减去当前值</description>
</p>
</properties>
</action>
<action type="destory" targetuiname="英雄子弹" targetuitype="AISprite" >
<properties>
</properties>
</action>
</actions>
<subevent>
</subevent>
</event>
<event name="敌人被打死" enable="true" relation="1">
<description>打死敌人后播放爆炸音效</description>
<conditons>
<condition type="CompareInstanceVariableEvent" targetuiname="敌人" targetuitype="AISprite" >
<properties>
<p key="instanceVariable" propertyname="HP" valuetype="string"  edittype="variable">
<description>请先创建一个本实例的变量进行比较运算</description>
</p>
<p key="operationType" value="lessOrEqual" valuetype="any" edittype="any">
<description>计算所需要的运算符</description>
</p>
<p key="value" value="0" valuetype="any" edittype="any">
<description>实例值</description>
</p>
</properties>
</condition>
</conditons>
<actions>
<action type="play" targetuiname="敌人死亡音效" targetuitype="AIAudio" >
<properties>
<p key="1" value="resource/sound/bigplane_bomb.mp3" valuetype="any" edittype="sound">
<description>音乐文件路径</description>
</p>
<p key="2" value="1" valuetype="any" edittype="any">
<description>声音循环次数</description>
</p>
<p key="3" value="1" valuetype="any" edittype="any">
<description>音量大小（值从0~1之间）</description>
</p>
</properties>
</action>
<action type="destory" targetuiname="敌人" targetuitype="AISprite" >
<properties>
</properties>
</action>
<action type="addTo" targetuiname="英雄" targetuitype="AISprite" >
<properties>
<p key="1" propertyname="score" valuetype="string"  edittype="variable">
<description>请选择当前某个实例变量</description>
</p>
<p key="2" value="100" valuetype="any" edittype="any">
<description>添加到这个实例变量的值</description>
</p>
</properties>
</action>
</actions>
<subevent>
</subevent>
</event>
<event name="敌人子弹打中英雄" enable="true" relation="1">
<description></description>
<conditons>
<condition type="OnCollisionWithOtherObjectEvent" targetuiname="敌人子弹" targetuitype="AISprite" >
<properties>
<p key="object" uiname="英雄" uitype="AISprite" valuetype="string"  edittype="instance">
<description>碰撞的对象</description>
</p>
</properties>
</condition>
</conditons>
<actions>
<action type="subtractFrom" targetuiname="英雄" targetuitype="AISprite" >
<properties>
<p key="7" propertyname="HP" valuetype="string"  edittype="variable">
<description>请选择当前某个实例变量</description>
</p>
<p key="8" value="1" valuetype="any" edittype="any">
<description>当前实例属性值减去当前值</description>
</p>
</properties>
</action>
<action type="destory" targetuiname="敌人子弹" targetuitype="AISprite" >
<properties>
</properties>
</action>
</actions>
<subevent>
</subevent>
</event>
<event name="英雄被敌人打死" enable="true" relation="1">
<description></description>
<conditons>
<condition type="CompareInstanceVariableEvent" targetuiname="英雄" targetuitype="AISprite" >
<properties>
<p key="instanceVariable" propertyname="HP" valuetype="string"  edittype="variable">
<description>请先创建一个本实例的变量进行比较运算</description>
</p>
<p key="operationType" value="lessOrEqual" valuetype="any" edittype="any">
<description>计算所需要的运算符</description>
</p>
<p key="value" value="0" valuetype="any" edittype="any">
<description>实例值</description>
</p>
</properties>
</condition>
</conditons>
<actions>
<action type="destory" targetuiname="英雄" targetuitype="AISprite" >
<properties>
</properties>
</action>
<action type="gotoScene" targetuiname="System" targetuitype="AISystem" >
<properties>
<p key="49" value="GameOverScene" valuetype="any" edittype="any">
<description>要跳转的场景名</description>
</p>
</properties>
</action>
</actions>
<subevent>
</subevent>
</event>
<event name="敌人开火" enable="true" relation="1">
<description>敌人每两秒发一个子弹</description>
<conditons>
<condition type="EveryXSecondsEvent" targetuiname="System" targetuitype="AISystem" >
<properties>
<p key="interval" value="1" valuetype="any" edittype="any">
<description>时间间隔（单位：秒）</description>
</p>
</properties>
</condition>
</conditons>
<actions>
<action type="spawn" targetuiname="敌人" targetuitype="AISprite" >
<properties>
<p key="10" uiname="敌人子弹" uitype="AISprite" valuetype="string"  edittype="instance">
<description>请选择要创建的对象的实例类型</description>
</p>
<p key="11" value="0" valuetype="any" edittype="any">
<description>要创建的对象所在的层次（类型：数字，数字越大，层次越高，高层次覆盖低层次）</description>
</p>
<p key="12" value="0" valuetype="any" edittype="any">
<description>相对于当前实例注册点所在的水平偏移坐标值</description>
</p>
<p key="13" value="0" valuetype="any" edittype="any">
<description>相对于当前实例注册点所在的垂直偏移坐标值</description>
</p>
</properties>
</action>
</actions>
<subevent>
</subevent>
</event>
<event name="产生敌人" enable="true" relation="1">
<description>每一秒产生一个敌人小兵</description>
<conditons>
<condition type="EveryXSecondsEvent" targetuiname="System" targetuitype="AISystem" >
<properties>
<p key="interval" value="1" valuetype="any" edittype="any">
<description>时间间隔（单位：秒）</description>
</p>
</properties>
</condition>
</conditons>
<actions>
<action type="spawn" targetuiname="上方物体生产基地" targetuitype="AISprite" >
<properties>
<p key="10" uiname="敌人" uitype="AISprite" valuetype="string"  edittype="instance">
<description>请选择要创建的对象的实例类型</description>
</p>
<p key="11" value="0" valuetype="any" edittype="any">
<description>要创建的对象所在的层次（类型：数字，数字越大，层次越高，高层次覆盖低层次）</description>
</p>
<p key="12" value="Math.random()*400-200" valuetype="any" edittype="any">
<description>相对于当前实例注册点所在的水平偏移坐标值</description>
</p>
<p key="13" value="0" valuetype="any" edittype="any">
<description>相对于当前实例注册点所在的垂直偏移坐标值</description>
</p>
</properties>
</action>
</actions>
<subevent>
</subevent>
</event>
<event name="产生BOSS" enable="true" relation="1">
<description>当得分20时创建BOSS</description>
<conditons>
<condition type="CompareInstanceVariableEvent" targetuiname="英雄" targetuitype="AISprite" >
<properties>
<p key="instanceVariable" propertyname="score" valuetype="string"  edittype="variable">
<description>请先创建一个本实例的变量进行比较运算</description>
</p>
<p key="operationType" value="equalTo" valuetype="any" edittype="any">
<description>计算所需要的运算符</description>
</p>
<p key="value" value="15" valuetype="any" edittype="any">
<description>实例值</description>
</p>
</properties>
</condition>
</conditons>
<actions>
<action type="spawn" targetuiname="上方物体生产基地" targetuitype="AISprite" >
<properties>
<p key="10" uiname="BOSS" uitype="AISprite" valuetype="string"  edittype="instance">
<description>请选择要创建的对象的实例类型</description>
</p>
<p key="11" value="0" valuetype="any" edittype="any">
<description>要创建的对象所在的层次（类型：数字，数字越大，层次越高，高层次覆盖低层次）</description>
</p>
<p key="12" value="0" valuetype="any" edittype="any">
<description>相对于当前实例注册点所在的水平偏移坐标值</description>
</p>
<p key="13" value="0" valuetype="any" edittype="any">
<description>相对于当前实例注册点所在的垂直偏移坐标值</description>
</p>
</properties>
</action>
<action type="setValue" targetuiname="BOSS" targetuitype="AISprite" >
<properties>
<p key="5" propertyname="alive" valuetype="string"  edittype="variable">
<description>请选择当前某个实例变量</description>
</p>
<p key="6" value="1" valuetype="any" edittype="any">
<description>更新当前实例的值</description>
</p>
</properties>
</action>
<action type="addTo" targetuiname="英雄" targetuitype="AISprite" >
<properties>
<p key="1" propertyname="score" valuetype="string"  edittype="variable">
<description>请选择当前某个实例变量</description>
</p>
<p key="2" value="1" valuetype="any" edittype="any">
<description>添加到这个实例变量的值</description>
</p>
</properties>
</action>
</actions>
<subevent>
</subevent>
</event>
<event name="BOSS出场" enable="true" relation="1">
<description></description>
<conditons>
<condition type="CompareYPosEvent" targetuiname="BOSS" targetuitype="AISprite" >
<properties>
<p key="operationType" value="lessThan" valuetype="any" edittype="any">
<description>计算所需要的运算符</description>
</p>
<p key="y" value="100" valuetype="any" edittype="any">
<description>垂直坐标</description>
</p>
</properties>
</condition>
</conditons>
<actions>
<action type="moveAtAngle" targetuiname="BOSS" targetuitype="AISprite" >
<properties>
<p key="14" value="90" valuetype="any" edittype="any">
<description>以当前角度对所选择类型实例进行移动（0~360度）</description>
</p>
<p key="15" value="3" valuetype="any" edittype="any">
<description>以所设置的角度与速度进行移动（单位：像素）</description>
</p>
</properties>
</action>
</actions>
<subevent>
</subevent>
</event>
<event name="BOSS开火" enable="true" relation="1">
<description></description>
<conditons>
<condition type="CompareYPosEvent" targetuiname="BOSS" targetuitype="AISprite" >
<properties>
<p key="operationType" value="greaterOrEqual" valuetype="any" edittype="any">
<description>计算所需要的运算符</description>
</p>
<p key="y" value="100" valuetype="any" edittype="any">
<description>垂直坐标</description>
</p>
</properties>
</condition>
<condition type="EveryXSecondsEvent" targetuiname="System" targetuitype="AISystem" >
<properties>
<p key="interval" value="0.5" valuetype="any" edittype="any">
<description>时间间隔（单位：秒）</description>
</p>
</properties>
</condition>
</conditons>
<actions>
<action type="spawn" targetuiname="BOSS" targetuitype="AISprite" >
<properties>
<p key="10" uiname="BOSS子弹" uitype="AISprite" valuetype="string"  edittype="instance">
<description>请选择要创建的对象的实例类型</description>
</p>
<p key="11" value="0" valuetype="any" edittype="any">
<description>要创建的对象所在的层次（类型：数字，数字越大，层次越高，高层次覆盖低层次）</description>
</p>
<p key="12" value="30" valuetype="any" edittype="any">
<description>相对于当前实例注册点所在的水平偏移坐标值</description>
</p>
<p key="13" value="30" valuetype="any" edittype="any">
<description>相对于当前实例注册点所在的垂直偏移坐标值</description>
</p>
</properties>
</action>
<action type="spawn" targetuiname="BOSS" targetuitype="AISprite" >
<properties>
<p key="10" uiname="BOSS子弹" uitype="AISprite" valuetype="string"  edittype="instance">
<description>请选择要创建的对象的实例类型</description>
</p>
<p key="11" value="0" valuetype="any" edittype="any">
<description>要创建的对象所在的层次（类型：数字，数字越大，层次越高，高层次覆盖低层次）</description>
</p>
<p key="12" value="-30" valuetype="any" edittype="any">
<description>相对于当前实例注册点所在的水平偏移坐标值</description>
</p>
<p key="13" value="30" valuetype="any" edittype="any">
<description>相对于当前实例注册点所在的垂直偏移坐标值</description>
</p>
</properties>
</action>
</actions>
<subevent>
</subevent>
</event>
<event name="打中BOSS" enable="true" relation="1">
<description></description>
<conditons>
<condition type="OnCollisionWithOtherObjectEvent" targetuiname="英雄子弹" targetuitype="AISprite" >
<properties>
<p key="object" uiname="BOSS" uitype="AISprite" valuetype="string"  edittype="instance">
<description>碰撞的对象</description>
</p>
</properties>
</condition>
</conditons>
<actions>
<action type="subtractFrom" targetuiname="BOSS" targetuitype="AISprite" >
<properties>
<p key="7" propertyname="HP" valuetype="string"  edittype="variable">
<description>请选择当前某个实例变量</description>
</p>
<p key="8" value="5" valuetype="any" edittype="any">
<description>当前实例属性值减去当前值</description>
</p>
</properties>
</action>
<action type="destory" targetuiname="英雄子弹" targetuitype="AISprite" >
<properties>
</properties>
</action>
</actions>
<subevent>
</subevent>
</event>
<event name="左移动BOSS" enable="true" relation="1">
<description></description>
<conditons>
<condition type="CompareYPosEvent" targetuiname="BOSS" targetuitype="AISprite" >
<properties>
<p key="operationType" value="greaterOrEqual" valuetype="any" edittype="any">
<description>计算所需要的运算符</description>
</p>
<p key="y" value="500" valuetype="any" edittype="any">
<description>垂直坐标</description>
</p>
</properties>
</condition>
<condition type="CompareInstanceVariableEvent" targetuiname="BOSS" targetuitype="AISprite" >
<properties>
<p key="instanceVariable" propertyname="movetage" valuetype="string"  edittype="variable">
<description>请先创建一个本实例的变量进行比较运算</description>
</p>
<p key="operationType" value="equalTo" valuetype="any" edittype="any">
<description>计算所需要的运算符</description>
</p>
<p key="value" value="0" valuetype="any" edittype="any">
<description>实例值</description>
</p>
</properties>
</condition>
<condition type="CompareInstanceVariableEvent" targetuiname="BOSS" targetuitype="AISprite" >
<properties>
<p key="instanceVariable" propertyname="alive" valuetype="string"  edittype="variable">
<description>请先创建一个本实例的变量进行比较运算</description>
</p>
<p key="operationType" value="equalTo" valuetype="any" edittype="any">
<description>计算所需要的运算符</description>
</p>
<p key="value" value="1" valuetype="any" edittype="any">
<description>实例值</description>
</p>
</properties>
</condition>
</conditons>
<actions>
<action type="moveAtAngle" targetuiname="BOSS" targetuitype="AISprite" >
<properties>
<p key="14" value="180" valuetype="any" edittype="any">
<description>以当前角度对所选择类型实例进行移动（0~360度）</description>
</p>
<p key="15" value="3" valuetype="any" edittype="any">
<description>以所设置的角度与速度进行移动（单位：像素）</description>
</p>
</properties>
</action>
</actions>
<subevent>
</subevent>
</event>
<event name="设置BOSS移动标志——右" enable="true" relation="1">
<description></description>
<conditons>
<condition type="CompareXPosEvent" targetuiname="BOSS" targetuitype="AISprite" >
<properties>
<p key="operationType" value="lessOrEqual" valuetype="any" edittype="any">
<description>计算所需要的运算符</description>
</p>
<p key="x" value="100" valuetype="any" edittype="any">
<description>水平坐标</description>
</p>
</properties>
</condition>
<condition type="CompareInstanceVariableEvent" targetuiname="BOSS" targetuitype="AISprite" >
<properties>
<p key="instanceVariable" propertyname="alive" valuetype="string"  edittype="variable">
<description>请先创建一个本实例的变量进行比较运算</description>
</p>
<p key="operationType" value="equalTo" valuetype="any" edittype="any">
<description>计算所需要的运算符</description>
</p>
<p key="value" value="0" valuetype="any" edittype="any">
<description>实例值</description>
</p>
</properties>
</condition>
</conditons>
<actions>
<action type="setValue" targetuiname="BOSS" targetuitype="AISprite" >
<properties>
<p key="5" propertyname="movetage" valuetype="string"  edittype="variable">
<description>请选择当前某个实例变量</description>
</p>
<p key="6" value="1" valuetype="any" edittype="any">
<description>更新当前实例的值</description>
</p>
</properties>
</action>
</actions>
<subevent>
</subevent>
</event>
<event name="右移动BOSS" enable="true" relation="1">
<description></description>
<conditons>
<condition type="CompareYPosEvent" targetuiname="BOSS" targetuitype="AISprite" >
<properties>
<p key="operationType" value="greaterOrEqual" valuetype="any" edittype="any">
<description>计算所需要的运算符</description>
</p>
<p key="y" value="100" valuetype="any" edittype="any">
<description>垂直坐标</description>
</p>
</properties>
</condition>
<condition type="CompareInstanceVariableEvent" targetuiname="BOSS" targetuitype="AISprite" >
<properties>
<p key="instanceVariable" propertyname="movetage" valuetype="string"  edittype="variable">
<description>请先创建一个本实例的变量进行比较运算</description>
</p>
<p key="operationType" value="equalTo" valuetype="any" edittype="any">
<description>计算所需要的运算符</description>
</p>
<p key="value" value="1" valuetype="any" edittype="any">
<description>实例值</description>
</p>
</properties>
</condition>
<condition type="CompareInstanceVariableEvent" targetuiname="BOSS" targetuitype="AISprite" >
<properties>
<p key="instanceVariable" propertyname="alive" valuetype="string"  edittype="variable">
<description>请先创建一个本实例的变量进行比较运算</description>
</p>
<p key="operationType" value="equalTo" valuetype="any" edittype="any">
<description>计算所需要的运算符</description>
</p>
<p key="value" value="1" valuetype="any" edittype="any">
<description>实例值</description>
</p>
</properties>
</condition>
</conditons>
<actions>
<action type="moveAtAngle" targetuiname="BOSS" targetuitype="AISprite" >
<properties>
<p key="14" value="0" valuetype="any" edittype="any">
<description>以当前角度对所选择类型实例进行移动（0~360度）</description>
</p>
<p key="15" value="3" valuetype="any" edittype="any">
<description>以所设置的角度与速度进行移动（单位：像素）</description>
</p>
</properties>
</action>
</actions>
<subevent>
</subevent>
</event>
<event name="设置BOSS移动标志——左" enable="true" relation="1">
<description></description>
<conditons>
<condition type="CompareXPosEvent" targetuiname="BOSS" targetuitype="AISprite" >
<properties>
<p key="operationType" value="greaterOrEqual" valuetype="any" edittype="any">
<description>计算所需要的运算符</description>
</p>
<p key="x" value="500" valuetype="any" edittype="any">
<description>水平坐标</description>
</p>
</properties>
</condition>
<condition type="CompareInstanceVariableEvent" targetuiname="BOSS" targetuitype="AISprite" >
<properties>
<p key="instanceVariable" propertyname="movetage" valuetype="string"  edittype="variable">
<description>请先创建一个本实例的变量进行比较运算</description>
</p>
<p key="operationType" value="equalTo" valuetype="any" edittype="any">
<description>计算所需要的运算符</description>
</p>
<p key="value" value="1" valuetype="any" edittype="any">
<description>实例值</description>
</p>
</properties>
</condition>
</conditons>
<actions>
<action type="setValue" targetuiname="BOSS" targetuitype="AISprite" >
<properties>
<p key="5" propertyname="movetage" valuetype="string"  edittype="variable">
<description>请选择当前某个实例变量</description>
</p>
<p key="6" value="0" valuetype="any" edittype="any">
<description>更新当前实例的值</description>
</p>
</properties>
</action>
</actions>
<subevent>
</subevent>
</event>
<event name="BOSS打中英雄" enable="true" relation="1">
<description></description>
<conditons>
<condition type="OnCollisionWithOtherObjectEvent" targetuiname="BOSS子弹" targetuitype="AISprite" >
<properties>
<p key="object" uiname="英雄" uitype="AISprite" valuetype="string"  edittype="instance">
<description>碰撞的对象</description>
</p>
</properties>
</condition>
</conditons>
<actions>
<action type="subtractFrom" targetuiname="英雄" targetuitype="AISprite" >
<properties>
<p key="7" propertyname="HP" valuetype="string"  edittype="variable">
<description>请选择当前某个实例变量</description>
</p>
<p key="8" value="2" valuetype="any" edittype="any">
<description>当前实例属性值减去当前值</description>
</p>
</properties>
</action>
<action type="destory" targetuiname="BOSS子弹" targetuitype="AISprite" >
<properties>
</properties>
</action>
</actions>
<subevent>
</subevent>
</event>
<event name="英雄吃到血" enable="true" relation="1">
<description></description>
<conditons>
<condition type="OnCollisionWithOtherObjectEvent" targetuiname="血" targetuitype="AISprite" >
<properties>
<p key="object" uiname="英雄" uitype="AISprite" valuetype="string"  edittype="instance">
<description>碰撞的对象</description>
</p>
</properties>
</condition>
</conditons>
<actions>
<action type="destory" targetuiname="血" targetuitype="AISprite" >
<properties>
</properties>
</action>
<action type="addTo" targetuiname="英雄" targetuitype="AISprite" >
<properties>
<p key="1" propertyname="HP" valuetype="string"  edittype="variable">
<description>请选择当前某个实例变量</description>
</p>
<p key="2" value="1" valuetype="any" edittype="any">
<description>添加到这个实例变量的值</description>
</p>
</properties>
</action>
</actions>
<subevent>
</subevent>
</event>
<event name="产生血" enable="true" relation="1">
<description>10秒一个</description>
<conditons>
<condition type="EveryXSecondsEvent" targetuiname="System" targetuitype="AISystem" >
<properties>
<p key="interval" value="5" valuetype="any" edittype="any">
<description>时间间隔（单位：秒）</description>
</p>
</properties>
</condition>
</conditons>
<actions>
<action type="spawn" targetuiname="上方物体生产基地" targetuitype="AISprite" >
<properties>
<p key="10" uiname="血" uitype="AISprite" valuetype="string"  edittype="instance">
<description>请选择要创建的对象的实例类型</description>
</p>
<p key="11" value="0" valuetype="any" edittype="any">
<description>要创建的对象所在的层次（类型：数字，数字越大，层次越高，高层次覆盖低层次）</description>
</p>
<p key="12" value="Math.random()*400-200" valuetype="any" edittype="any">
<description>相对于当前实例注册点所在的水平偏移坐标值</description>
</p>
<p key="13" value="0" valuetype="any" edittype="any">
<description>相对于当前实例注册点所在的垂直偏移坐标值</description>
</p>
</properties>
</action>
</actions>
<subevent>
</subevent>
</event>
</sheet>
<sheet name="GameOverSceneEventSheet" targetscene="GameOverScene">
<event name="再来一次" enable="true" relation="0">
<description></description>
<conditons>
<condition type="OnButtonClickEvent" targetuiname="再来一次" targetuitype="AIButton" >
<properties>
</properties>
</condition>
</conditons>
<actions>
<action type="gotoScene" targetuiname="System" targetuitype="AISystem" >
<properties>
<p key="49" value="GameScene" valuetype="any" edittype="any">
<description>要跳转的场景名</description>
</p>
</properties>
</action>
<action type="play" targetuiname="英雄死亡音效" targetuitype="AIAudio" >
<properties>
<p key="1" value="resource/sound/bullet.mp3" valuetype="any" edittype="sound">
<description>音乐文件路径</description>
</p>
<p key="2" value="0" valuetype="any" edittype="any">
<description>声音循环次数</description>
</p>
<p key="3" value="2" valuetype="any" edittype="any">
<description>音量大小（值从0~1之间）</description>
</p>
</properties>
</action>
</actions>
<subevent>
</subevent>
</event>
<event name="返回菜单" enable="true" relation="1">
<description></description>
<conditons>
<condition type="OnButtonClickEvent" targetuiname="返回菜单" targetuitype="AIButton" >
<properties>
</properties>
</condition>
</conditons>
<actions>
<action type="gotoScene" targetuiname="System" targetuitype="AISystem" >
<properties>
<p key="49" value="MainScence" valuetype="any" edittype="any">
<description>要跳转的场景名</description>
</p>
</properties>
</action>
</actions>
<subevent>
</subevent>
</event>
</sheet>
<sheet name="MainSceneEventSheet" targetscene="MainScene">
<event name="开始游戏" enable="true" relation="1">
<description></description>
<conditons>
<condition type="OnButtonClickEvent" targetuiname="开始游戏" targetuitype="AIButton" >
<properties>
</properties>
</condition>
</conditons>
<actions>
<action type="gotoScene" targetuiname="System" targetuitype="AISystem" >
<properties>
<p key="49" value="GameScene" valuetype="any" edittype="any">
<description>要跳转的场景名</description>
</p>
</properties>
</action>
</actions>
<subevent>
</subevent>
</event>
</sheet>
</eventsheet>
<scenes>
<object type="Scene" uiname="GameScene">
<properties>
<p key="uiGuid" value="13" valuetype="string" edittype="any">
</p>
<p key="x" value="0" valuetype="number" edittype="any">
</p>
<p key="y" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorX" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorY" value="0" valuetype="number" edittype="any">
</p>
<p key="width" value="511" valuetype="number" edittype="any">
</p>
<p key="height" value="762" valuetype="number" edittype="any">
</p>
<p key="angle" value="0" valuetype="number" edittype="any">
</p>
<p key="alpha" value="1" valuetype="number" edittype="any">
</p>
<p key="visible" value="1" valuetype="boolean" edittype="boolean">
</p>
</properties>
<customproperties></customproperties><behaviors></behaviors>
<children>
<object type="Layer" uiname="背景层">
<properties>
<p key="uiGuid" value="15" valuetype="string" edittype="any">
</p>
<p key="x" value="0" valuetype="number" edittype="any">
</p>
<p key="y" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorX" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorY" value="0" valuetype="number" edittype="any">
</p>
<p key="width" value="511" valuetype="number" edittype="any">
</p>
<p key="height" value="762" valuetype="number" edittype="any">
</p>
<p key="angle" value="0" valuetype="number" edittype="any">
</p>
<p key="alpha" value="1" valuetype="number" edittype="any">
</p>
<p key="visible" value="1" valuetype="boolean" edittype="boolean">
</p>
</properties>
<customproperties></customproperties><behaviors></behaviors>
<children>
<object type="AISprite" uiname="滚动背景">
<properties>
<p key="uiGuid" value="18" valuetype="string" edittype="any">
</p>
<p key="x" value="0" valuetype="number" edittype="any">
</p>
<p key="y" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorX" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorY" value="0" valuetype="number" edittype="any">
</p>
<p key="width" value="512" valuetype="number" edittype="any">
</p>
<p key="height" value="768" valuetype="number" edittype="any">
</p>
<p key="angle" value="0" valuetype="number" edittype="any">
</p>
<p key="alpha" value="1" valuetype="number" edittype="any">
</p>
<p key="visible" value="1" valuetype="boolean" edittype="boolean">
</p>
<p key="url" value="resource/image/bg.jpg" valuetype="string" edittype="image">
</p>
<p key="collision" value="" valuetype="boolean" edittype="any">
</p>
</properties>
<customproperties></customproperties><behaviors>
<b name="滚屏行为" type="ScrollBehaivor">
<properties>
<p key="scrollDirectionType" value="scrollDown" valuetype="any" edittype="any">
<description>根据不同的类型可以让滚屏实现上，下，左，右滚屏</description>
</p>
<p key="speed" value="180" valuetype="any" edittype="any">
<description>滚屏的速度（单位：像素/秒）</description>
</p>
</properties>
</b></behaviors>
<children>
</children>
</object>
<object type="AISprite" uiname="滚动背景">
<properties>
<p key="uiGuid" value="17" valuetype="string" edittype="any">
</p>
<p key="x" value="0" valuetype="number" edittype="any">
</p>
<p key="y" value="-768" valuetype="number" edittype="any">
</p>
<p key="anchorX" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorY" value="0" valuetype="number" edittype="any">
</p>
<p key="width" value="512" valuetype="number" edittype="any">
</p>
<p key="height" value="768" valuetype="number" edittype="any">
</p>
<p key="angle" value="0" valuetype="number" edittype="any">
</p>
<p key="alpha" value="1" valuetype="number" edittype="any">
</p>
<p key="visible" value="1" valuetype="boolean" edittype="boolean">
</p>
<p key="url" value="resource/image/bg.jpg" valuetype="string" edittype="image">
</p>
<p key="collision" value="" valuetype="boolean" edittype="any">
</p>
</properties>
<customproperties></customproperties><behaviors>
<b name="滚屏行为" type="ScrollBehaivor">
<properties>
<p key="scrollDirectionType" value="scrollDown" valuetype="any" edittype="any">
<description>根据不同的类型可以让滚屏实现上，下，左，右滚屏</description>
</p>
<p key="speed" value="180" valuetype="any" edittype="any">
<description>滚屏的速度（单位：像素/秒）</description>
</p>
</properties>
</b></behaviors>
<children>
</children>
</object>
<object type="AISprite" uiname="AISprite73">
<properties>
<p key="uiGuid" value="74" valuetype="string" edittype="any">
</p>
<p key="x" value="-276.05" valuetype="number" edittype="any">
</p>
<p key="y" value="-3.4999999999999996" valuetype="number" edittype="any">
</p>
<p key="anchorX" value="0.5" valuetype="number" edittype="any">
</p>
<p key="anchorY" value="0.5" valuetype="number" edittype="any">
</p>
<p key="width" value="44.99999999999999" valuetype="number" edittype="any">
</p>
<p key="height" value="59" valuetype="number" edittype="any">
</p>
<p key="angle" value="0" valuetype="number" edittype="any">
</p>
<p key="alpha" value="1" valuetype="number" edittype="any">
</p>
<p key="visible" value="1" valuetype="boolean" edittype="boolean">
</p>
<p key="url" value="" valuetype="string" edittype="image">
</p>
<p key="collision" value="" valuetype="boolean" edittype="any">
</p>
</properties>
<customproperties></customproperties><behaviors></behaviors>
<children>
</children>
</object>
</children>
</object>
<object type="Layer" uiname="物体层">
<properties>
<p key="uiGuid" value="20" valuetype="string" edittype="any">
</p>
<p key="x" value="0" valuetype="number" edittype="any">
</p>
<p key="y" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorX" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorY" value="0" valuetype="number" edittype="any">
</p>
<p key="width" value="511" valuetype="number" edittype="any">
</p>
<p key="height" value="762" valuetype="number" edittype="any">
</p>
<p key="angle" value="0" valuetype="number" edittype="any">
</p>
<p key="alpha" value="1" valuetype="number" edittype="any">
</p>
<p key="visible" value="1" valuetype="boolean" edittype="boolean">
</p>
</properties>
<customproperties></customproperties><behaviors></behaviors>
<children>
<object type="AISprite" uiname="英雄">
<properties>
<p key="uiGuid" value="22" valuetype="string" edittype="any">
</p>
<p key="x" value="255.95000000000005" valuetype="number" edittype="any">
</p>
<p key="y" value="710.25" valuetype="number" edittype="any">
</p>
<p key="anchorX" value="0.5" valuetype="number" edittype="any">
</p>
<p key="anchorY" value="0.5" valuetype="number" edittype="any">
</p>
<p key="width" value="72.00000000000006" valuetype="number" edittype="any">
</p>
<p key="height" value="78.49999999999997" valuetype="number" edittype="any">
</p>
<p key="angle" value="0" valuetype="number" edittype="any">
</p>
<p key="alpha" value="1" valuetype="number" edittype="any">
</p>
<p key="visible" value="1" valuetype="boolean" edittype="boolean">
</p>
<p key="url" value="resource/image/aircraft.png" valuetype="string" edittype="image">
</p>
<p key="collision" value="1" valuetype="boolean" edittype="any">
</p>
</properties>
<customproperties>
<p key="score" value="100" valuetype="number" edittype="any">
<description>得分</description>
</p>
<p key="HP" value="5" valuetype="number" edittype="any">
<description>生命值</description>
</p></customproperties><behaviors>
<b name="拖拽行为" type="DragDropBehaivor">
<properties>
</properties>
</b></behaviors>
<children>
</children>
</object>
<object type="AISprite" uiname="英雄子弹">
<properties>
<p key="uiGuid" value="24" valuetype="string" edittype="any">
</p>
<p key="x" value="-48.5" valuetype="number" edittype="any">
</p>
<p key="y" value="701.45" valuetype="number" edittype="any">
</p>
<p key="anchorX" value="0.5172413793103449" valuetype="number" edittype="any">
</p>
<p key="anchorY" value="0.5106382978723404" valuetype="number" edittype="any">
</p>
<p key="width" value="29" valuetype="number" edittype="any">
</p>
<p key="height" value="47" valuetype="number" edittype="any">
</p>
<p key="angle" value="0" valuetype="number" edittype="any">
</p>
<p key="alpha" value="1" valuetype="number" edittype="any">
</p>
<p key="visible" value="1" valuetype="boolean" edittype="boolean">
</p>
<p key="url" value="resource/image/aircraftBullet.png" valuetype="string" edittype="image">
</p>
<p key="collision" value="1" valuetype="boolean" edittype="any">
</p>
</properties>
<customproperties></customproperties><behaviors>
<b name="出边界销毁行为" type="DestoryOutsideLayoutBehaivor">
<properties>
</properties>
</b>
<b name="子弹行为" type="BulletBehaivor">
<properties>
<p key="speed" value="600" valuetype="any" edittype="any">
<description>设置子弹的运动速度（单位：像素/秒）</description>
</p>
<p key="acceleration" value="0" valuetype="any" edittype="any">
<description>子弹运动的加速度，通常来讲，子弹默认的加速度为零</description>
</p>
<p key="gravity" value="0" valuetype="any" edittype="any">
<description>子弹所具备的重力，通常重力值为零</description>
</p>
<p key="SetAngle" value="1" valuetype="any" edittype="any">
<description>设置子弹行为的运行角度，如果为"是"，那么，表示此子弹行为不受实例本身角度影响，否则将受实例本身角度影响，即取实体本身角度</description>
</p>
<p key="angle" value="-90" valuetype="any" edittype="any">
<description>如果"设置角度"一项值为"否"，那么，此值不起作用，否则，子弹行为的方向根据此值来执行</description>
</p>
</properties>
</b></behaviors>
<children>
</children>
</object>
<object type="AISprite" uiname="上方物体生产基地">
<properties>
<p key="uiGuid" value="26" valuetype="string" edittype="any">
</p>
<p key="x" value="249" valuetype="number" edittype="any">
</p>
<p key="y" value="-51.5" valuetype="number" edittype="any">
</p>
<p key="anchorX" value="0.5" valuetype="number" edittype="any">
</p>
<p key="anchorY" value="0.5" valuetype="number" edittype="any">
</p>
<p key="width" value="69" valuetype="number" edittype="any">
</p>
<p key="height" value="61.99999999999999" valuetype="number" edittype="any">
</p>
<p key="angle" value="0" valuetype="number" edittype="any">
</p>
<p key="alpha" value="1" valuetype="number" edittype="any">
</p>
<p key="visible" value="1" valuetype="boolean" edittype="boolean">
</p>
<p key="url" value="" valuetype="string" edittype="image">
</p>
<p key="collision" value="" valuetype="boolean" edittype="any">
</p>
</properties>
<customproperties></customproperties><behaviors></behaviors>
<children>
</children>
</object>
<object type="AISprite" uiname="敌人">
<properties>
<p key="uiGuid" value="28" valuetype="string" edittype="any">
</p>
<p key="x" value="-77" valuetype="number" edittype="any">
</p>
<p key="y" value="45.5" valuetype="number" edittype="any">
</p>
<p key="anchorX" value="0.5" valuetype="number" edittype="any">
</p>
<p key="anchorY" value="0.5" valuetype="number" edittype="any">
</p>
<p key="width" value="82" valuetype="number" edittype="any">
</p>
<p key="height" value="67" valuetype="number" edittype="any">
</p>
<p key="angle" value="0" valuetype="number" edittype="any">
</p>
<p key="alpha" value="1" valuetype="number" edittype="any">
</p>
<p key="visible" value="1" valuetype="boolean" edittype="boolean">
</p>
<p key="url" value="resource/image/aircraft_small.png" valuetype="string" edittype="image">
</p>
<p key="collision" value="1" valuetype="boolean" edittype="any">
</p>
</properties>
<customproperties>
<p key="HP" value="10" valuetype="number" edittype="any">
<description>生命值</description>
</p></customproperties><behaviors>
<b name="子弹行为" type="BulletBehaivor">
<properties>
<p key="speed" value="100" valuetype="any" edittype="any">
<description>设置子弹的运动速度（单位：像素/秒）</description>
</p>
<p key="acceleration" value="0" valuetype="any" edittype="any">
<description>子弹运动的加速度，通常来讲，子弹默认的加速度为零</description>
</p>
<p key="gravity" value="0" valuetype="any" edittype="any">
<description>子弹所具备的重力，通常重力值为零</description>
</p>
<p key="SetAngle" value="1" valuetype="any" edittype="any">
<description>设置子弹行为的运行角度，如果为"是"，那么，表示此子弹行为不受实例本身角度影响，否则将受实例本身角度影响，即取实体本身角度</description>
</p>
<p key="angle" value="90" valuetype="any" edittype="any">
<description>如果"设置角度"一项值为"否"，那么，此值不起作用，否则，子弹行为的方向根据此值来执行</description>
</p>
</properties>
</b></behaviors>
<children>
</children>
</object>
<object type="AISprite" uiname="敌人子弹">
<properties>
<p key="uiGuid" value="30" valuetype="string" edittype="any">
</p>
<p key="x" value="-63" valuetype="number" edittype="any">
</p>
<p key="y" value="151.5" valuetype="number" edittype="any">
</p>
<p key="anchorX" value="0.5" valuetype="number" edittype="any">
</p>
<p key="anchorY" value="0.5" valuetype="number" edittype="any">
</p>
<p key="width" value="28" valuetype="number" edittype="any">
</p>
<p key="height" value="29" valuetype="number" edittype="any">
</p>
<p key="angle" value="0" valuetype="number" edittype="any">
</p>
<p key="alpha" value="1" valuetype="number" edittype="any">
</p>
<p key="visible" value="1" valuetype="boolean" edittype="boolean">
</p>
<p key="url" value="resource/image/enemyBullet.png" valuetype="string" edittype="image">
</p>
<p key="collision" value="1" valuetype="boolean" edittype="any">
</p>
</properties>
<customproperties></customproperties><behaviors>
<b name="子弹行为" type="BulletBehaivor">
<properties>
<p key="speed" value="400" valuetype="any" edittype="any">
<description>设置子弹的运动速度（单位：像素/秒）</description>
</p>
<p key="acceleration" value="0" valuetype="any" edittype="any">
<description>子弹运动的加速度，通常来讲，子弹默认的加速度为零</description>
</p>
<p key="gravity" value="0" valuetype="any" edittype="any">
<description>子弹所具备的重力，通常重力值为零</description>
</p>
<p key="SetAngle" value="1" valuetype="any" edittype="any">
<description>设置子弹行为的运行角度，如果为"是"，那么，表示此子弹行为不受实例本身角度影响，否则将受实例本身角度影响，即取实体本身角度</description>
</p>
<p key="angle" value="90" valuetype="any" edittype="any">
<description>如果"设置角度"一项值为"否"，那么，此值不起作用，否则，子弹行为的方向根据此值来执行</description>
</p>
</properties>
</b>
<b name="出边界销毁行为" type="DestoryOutsideLayoutBehaivor">
<properties>
</properties>
</b></behaviors>
<children>
</children>
</object>
<object type="AISprite" uiname="BOSS">
<properties>
<p key="uiGuid" value="32" valuetype="string" edittype="any">
</p>
<p key="x" value="259.5" valuetype="number" edittype="any">
</p>
<p key="y" value="989" valuetype="number" edittype="any">
</p>
<p key="anchorX" value="0.5" valuetype="number" edittype="any">
</p>
<p key="anchorY" value="0.5" valuetype="number" edittype="any">
</p>
<p key="width" value="221" valuetype="number" edittype="any">
</p>
<p key="height" value="137" valuetype="number" edittype="any">
</p>
<p key="angle" value="0" valuetype="number" edittype="any">
</p>
<p key="alpha" value="1" valuetype="number" edittype="any">
</p>
<p key="visible" value="1" valuetype="boolean" edittype="boolean">
</p>
<p key="url" value="resource/image/boss.png" valuetype="string" edittype="image">
</p>
<p key="collision" value="1" valuetype="boolean" edittype="any">
</p>
</properties>
<customproperties>
<p key="HP" value="100" valuetype="number" edittype="any">
<description>生命值</description>
</p>
<p key="alive" value="0" valuetype="number" edittype="any">
</p>
<p key="movetage" value="0" valuetype="number" edittype="any">
</p></customproperties><behaviors></behaviors>
<children>
</children>
</object>
<object type="AISprite" uiname="BOSS子弹">
<properties>
<p key="uiGuid" value="34" valuetype="string" edittype="any">
</p>
<p key="x" value="-229.5" valuetype="number" edittype="any">
</p>
<p key="y" value="238.5" valuetype="number" edittype="any">
</p>
<p key="anchorX" value="0.5" valuetype="number" edittype="any">
</p>
<p key="anchorY" value="0.5" valuetype="number" edittype="any">
</p>
<p key="width" value="29" valuetype="number" edittype="any">
</p>
<p key="height" value="43" valuetype="number" edittype="any">
</p>
<p key="angle" value="0" valuetype="number" edittype="any">
</p>
<p key="alpha" value="1" valuetype="number" edittype="any">
</p>
<p key="visible" value="1" valuetype="boolean" edittype="boolean">
</p>
<p key="url" value="resource/image/bossBullet.png" valuetype="string" edittype="image">
</p>
<p key="collision" value="1" valuetype="boolean" edittype="any">
</p>
</properties>
<customproperties></customproperties><behaviors>
<b name="子弹行为" type="BulletBehaivor">
<properties>
<p key="speed" value="400" valuetype="any" edittype="any">
<description>设置子弹的运动速度（单位：像素/秒）</description>
</p>
<p key="acceleration" value="0" valuetype="any" edittype="any">
<description>子弹运动的加速度，通常来讲，子弹默认的加速度为零</description>
</p>
<p key="gravity" value="0" valuetype="any" edittype="any">
<description>子弹所具备的重力，通常重力值为零</description>
</p>
<p key="SetAngle" value="1" valuetype="any" edittype="any">
<description>设置子弹行为的运行角度，如果为"是"，那么，表示此子弹行为不受实例本身角度影响，否则将受实例本身角度影响，即取实体本身角度</description>
</p>
<p key="angle" value="90" valuetype="any" edittype="any">
<description>如果"设置角度"一项值为"否"，那么，此值不起作用，否则，子弹行为的方向根据此值来执行</description>
</p>
</properties>
</b>
<b name="出边界销毁行为" type="DestoryOutsideLayoutBehaivor">
<properties>
</properties>
</b></behaviors>
<children>
</children>
</object>
<object type="AIAudio" uiname="英雄开火音效">
<properties>
<p key="uiGuid" value="36" valuetype="string" edittype="any">
</p>
<p key="x" value="-141.5" valuetype="number" edittype="any">
</p>
<p key="y" value="475.5" valuetype="number" edittype="any">
</p>
<p key="anchorX" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorY" value="0" valuetype="number" edittype="any">
</p>
<p key="width" value="100" valuetype="number" edittype="any">
</p>
<p key="height" value="100" valuetype="number" edittype="any">
</p>
<p key="angle" value="0" valuetype="number" edittype="any">
</p>
<p key="alpha" value="1" valuetype="number" edittype="any">
</p>
<p key="visible" value="1" valuetype="boolean" edittype="boolean">
</p>
<p key="url" value="" valuetype="string" edittype="sound">
</p>
<p key="loop" value="1" valuetype="number" edittype="any">
</p>
<p key="volume" value="1" valuetype="number" edittype="any">
</p>
</properties>
<customproperties></customproperties><behaviors></behaviors>
<children>
</children>
</object>
<object type="AIAudio" uiname="背景音效">
<properties>
<p key="uiGuid" value="38" valuetype="string" edittype="any">
</p>
<p key="x" value="-149.5" valuetype="number" edittype="any">
</p>
<p key="y" value="542.5" valuetype="number" edittype="any">
</p>
<p key="anchorX" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorY" value="0" valuetype="number" edittype="any">
</p>
<p key="width" value="100" valuetype="number" edittype="any">
</p>
<p key="height" value="100" valuetype="number" edittype="any">
</p>
<p key="angle" value="0" valuetype="number" edittype="any">
</p>
<p key="alpha" value="1" valuetype="number" edittype="any">
</p>
<p key="visible" value="1" valuetype="boolean" edittype="boolean">
</p>
<p key="url" value="resource/sound/background.mp3" valuetype="string" edittype="sound">
</p>
<p key="loop" value="100000" valuetype="number" edittype="any">
</p>
<p key="volume" value="1" valuetype="number" edittype="any">
</p>
</properties>
<customproperties></customproperties><behaviors></behaviors>
<children>
</children>
</object>
<object type="AIAudio" uiname="敌人死亡音效">
<properties>
<p key="uiGuid" value="40" valuetype="string" edittype="any">
</p>
<p key="x" value="-145.5" valuetype="number" edittype="any">
</p>
<p key="y" value="340.5" valuetype="number" edittype="any">
</p>
<p key="anchorX" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorY" value="0" valuetype="number" edittype="any">
</p>
<p key="width" value="100" valuetype="number" edittype="any">
</p>
<p key="height" value="100" valuetype="number" edittype="any">
</p>
<p key="angle" value="0" valuetype="number" edittype="any">
</p>
<p key="alpha" value="1" valuetype="number" edittype="any">
</p>
<p key="visible" value="1" valuetype="boolean" edittype="boolean">
</p>
<p key="url" value="" valuetype="string" edittype="sound">
</p>
<p key="loop" value="1" valuetype="number" edittype="any">
</p>
<p key="volume" value="1" valuetype="number" edittype="any">
</p>
</properties>
<customproperties></customproperties><behaviors></behaviors>
<children>
</children>
</object>
<object type="AIAudio" uiname="英雄死亡音效">
<properties>
<p key="uiGuid" value="42" valuetype="string" edittype="any">
</p>
<p key="x" value="-146.5" valuetype="number" edittype="any">
</p>
<p key="y" value="409.5" valuetype="number" edittype="any">
</p>
<p key="anchorX" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorY" value="0" valuetype="number" edittype="any">
</p>
<p key="width" value="100" valuetype="number" edittype="any">
</p>
<p key="height" value="100" valuetype="number" edittype="any">
</p>
<p key="angle" value="0" valuetype="number" edittype="any">
</p>
<p key="alpha" value="1" valuetype="number" edittype="any">
</p>
<p key="visible" value="1" valuetype="boolean" edittype="boolean">
</p>
<p key="url" value="" valuetype="string" edittype="sound">
</p>
<p key="loop" value="1" valuetype="number" edittype="any">
</p>
<p key="volume" value="1" valuetype="number" edittype="any">
</p>
</properties>
<customproperties></customproperties><behaviors></behaviors>
<children>
</children>
</object>
<object type="AITextField" uiname="分数">
<properties>
<p key="uiGuid" value="61" valuetype="string" edittype="any">
</p>
<p key="x" value="320.5" valuetype="number" edittype="any">
</p>
<p key="y" value="0.8999999999999917" valuetype="number" edittype="any">
</p>
<p key="anchorX" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorY" value="0" valuetype="number" edittype="any">
</p>
<p key="width" value="210.5" valuetype="number" edittype="any">
</p>
<p key="height" value="100" valuetype="number" edittype="any">
</p>
<p key="angle" value="0" valuetype="number" edittype="any">
</p>
<p key="alpha" value="1" valuetype="number" edittype="any">
</p>
<p key="visible" value="1" valuetype="boolean" edittype="boolean">
</p>
<p key="text" value="得分：100" valuetype="string" edittype="any">
</p>
<p key="fontFamily" value="黑体" valuetype="string" edittype="any">
</p>
<p key="size" value="40" valuetype="number" edittype="any">
</p>
<p key="textColor" value="15398640" valuetype="number" edittype="any">
</p>
<p key="bold" value="1" valuetype="boolean" edittype="any">
</p>
<p key="enableInput" value="0" valuetype="boolean" edittype="any">
</p>
</properties>
<customproperties></customproperties><behaviors></behaviors>
<children>
</children>
</object>
<object type="AISprite" uiname="HP标题图片">
<properties>
<p key="uiGuid" value="63" valuetype="string" edittype="any">
</p>
<p key="x" value="35" valuetype="number" edittype="any">
</p>
<p key="y" value="27.5" valuetype="number" edittype="any">
</p>
<p key="anchorX" value="0.5" valuetype="number" edittype="any">
</p>
<p key="anchorY" value="0.5" valuetype="number" edittype="any">
</p>
<p key="width" value="64" valuetype="number" edittype="any">
</p>
<p key="height" value="39" valuetype="number" edittype="any">
</p>
<p key="angle" value="0" valuetype="number" edittype="any">
</p>
<p key="alpha" value="1" valuetype="number" edittype="any">
</p>
<p key="visible" value="1" valuetype="boolean" edittype="boolean">
</p>
<p key="url" value="resource/image/hp.png" valuetype="string" edittype="image">
</p>
<p key="collision" value="" valuetype="boolean" edittype="any">
</p>
</properties>
<customproperties></customproperties><behaviors></behaviors>
<children>
</children>
</object>
<object type="AITextField" uiname="英雄生命">
<properties>
<p key="uiGuid" value="65" valuetype="string" edittype="any">
</p>
<p key="x" value="67" valuetype="number" edittype="any">
</p>
<p key="y" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorX" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorY" value="0" valuetype="number" edittype="any">
</p>
<p key="width" value="100" valuetype="number" edittype="any">
</p>
<p key="height" value="100" valuetype="number" edittype="any">
</p>
<p key="angle" value="0" valuetype="number" edittype="any">
</p>
<p key="alpha" value="1" valuetype="number" edittype="any">
</p>
<p key="visible" value="1" valuetype="boolean" edittype="boolean">
</p>
<p key="text" value="5" valuetype="string" edittype="any">
</p>
<p key="fontFamily" value="黑体" valuetype="string" edittype="any">
</p>
<p key="size" value="50" valuetype="number" edittype="any">
</p>
<p key="textColor" value="13745712" valuetype="number" edittype="any">
</p>
<p key="bold" value="0" valuetype="boolean" edittype="any">
</p>
<p key="enableInput" value="0" valuetype="boolean" edittype="any">
</p>
</properties>
<customproperties></customproperties><behaviors></behaviors>
<children>
</children>
</object>
<object type="AISprite" uiname="血">
<properties>
<p key="uiGuid" value="71" valuetype="string" edittype="any">
</p>
<p key="x" value="-87.5" valuetype="number" edittype="any">
</p>
<p key="y" value="205" valuetype="number" edittype="any">
</p>
<p key="anchorX" value="0.5" valuetype="number" edittype="any">
</p>
<p key="anchorY" value="0.5" valuetype="number" edittype="any">
</p>
<p key="width" value="45" valuetype="number" edittype="any">
</p>
<p key="height" value="41" valuetype="number" edittype="any">
</p>
<p key="angle" value="0" valuetype="number" edittype="any">
</p>
<p key="alpha" value="1" valuetype="number" edittype="any">
</p>
<p key="visible" value="1" valuetype="boolean" edittype="boolean">
</p>
<p key="url" value="resource/image/buff_blood.png" valuetype="string" edittype="image">
</p>
<p key="collision" value="1" valuetype="boolean" edittype="any">
</p>
</properties>
<customproperties></customproperties><behaviors>
<b name="子弹行为" type="BulletBehaivor">
<properties>
<p key="speed" value="300" valuetype="any" edittype="any">
<description>设置子弹的运动速度（单位：像素/秒）</description>
</p>
<p key="acceleration" value="0" valuetype="any" edittype="any">
<description>子弹运动的加速度，通常来讲，子弹默认的加速度为零</description>
</p>
<p key="gravity" value="0" valuetype="any" edittype="any">
<description>子弹所具备的重力，通常重力值为零</description>
</p>
<p key="SetAngle" value="1" valuetype="any" edittype="any">
<description>设置子弹行为的运行角度，如果为"是"，那么，表示此子弹行为不受实例本身角度影响，否则将受实例本身角度影响，即取实体本身角度</description>
</p>
<p key="angle" value="90" valuetype="any" edittype="any">
<description>如果"设置角度"一项值为"否"，那么，此值不起作用，否则，子弹行为的方向根据此值来执行</description>
</p>
</properties>
</b></behaviors>
<children>
</children>
</object>
</children>
</object>
</children>
</object>
<object type="Scene" uiname="GameOverScene">
<properties>
<p key="uiGuid" value="43" valuetype="string" edittype="any">
</p>
<p key="x" value="0" valuetype="number" edittype="any">
</p>
<p key="y" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorX" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorY" value="0" valuetype="number" edittype="any">
</p>
<p key="width" value="511" valuetype="number" edittype="any">
</p>
<p key="height" value="762" valuetype="number" edittype="any">
</p>
<p key="angle" value="0" valuetype="number" edittype="any">
</p>
<p key="alpha" value="1" valuetype="number" edittype="any">
</p>
<p key="visible" value="1" valuetype="boolean" edittype="boolean">
</p>
</properties>
<customproperties></customproperties><behaviors></behaviors>
<children>
<object type="Layer" uiname="背景层">
<properties>
<p key="uiGuid" value="45" valuetype="string" edittype="any">
</p>
<p key="x" value="0" valuetype="number" edittype="any">
</p>
<p key="y" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorX" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorY" value="0" valuetype="number" edittype="any">
</p>
<p key="width" value="511" valuetype="number" edittype="any">
</p>
<p key="height" value="762" valuetype="number" edittype="any">
</p>
<p key="angle" value="0" valuetype="number" edittype="any">
</p>
<p key="alpha" value="1" valuetype="number" edittype="any">
</p>
<p key="visible" value="1" valuetype="boolean" edittype="boolean">
</p>
</properties>
<customproperties></customproperties><behaviors></behaviors>
<children>
<object type="AISprite" uiname="游戏结束背景1">
<properties>
<p key="uiGuid" value="47" valuetype="string" edittype="any">
</p>
<p key="x" value="0" valuetype="number" edittype="any">
</p>
<p key="y" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorX" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorY" value="0" valuetype="number" edittype="any">
</p>
<p key="width" value="512" valuetype="number" edittype="any">
</p>
<p key="height" value="768" valuetype="number" edittype="any">
</p>
<p key="angle" value="0" valuetype="number" edittype="any">
</p>
<p key="alpha" value="1" valuetype="number" edittype="any">
</p>
<p key="visible" value="1" valuetype="boolean" edittype="boolean">
</p>
<p key="url" value="resource/image/bg.jpg" valuetype="string" edittype="image">
</p>
<p key="collision" value="" valuetype="boolean" edittype="any">
</p>
</properties>
<customproperties></customproperties><behaviors></behaviors>
<children>
</children>
</object>
<object type="AISprite" uiname="游戏结束背景2">
<properties>
<p key="uiGuid" value="49" valuetype="string" edittype="any">
</p>
<p key="x" value="0" valuetype="number" edittype="any">
</p>
<p key="y" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorX" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorY" value="0" valuetype="number" edittype="any">
</p>
<p key="width" value="512" valuetype="number" edittype="any">
</p>
<p key="height" value="768" valuetype="number" edittype="any">
</p>
<p key="angle" value="0" valuetype="number" edittype="any">
</p>
<p key="alpha" value="1" valuetype="number" edittype="any">
</p>
<p key="visible" value="1" valuetype="boolean" edittype="boolean">
</p>
<p key="url" value="resource/image/resultBg.png" valuetype="string" edittype="image">
</p>
<p key="collision" value="" valuetype="boolean" edittype="any">
</p>
</properties>
<customproperties></customproperties><behaviors></behaviors>
<children>
</children>
</object>
<object type="AIButton" uiname="返回菜单">
<properties>
<p key="uiGuid" value="89" valuetype="string" edittype="any">
</p>
<p key="x" value="168" valuetype="number" edittype="any">
</p>
<p key="y" value="548" valuetype="number" edittype="any">
</p>
<p key="anchorX" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorY" value="0" valuetype="number" edittype="any">
</p>
<p key="width" value="177" valuetype="number" edittype="any">
</p>
<p key="height" value="58" valuetype="number" edittype="any">
</p>
<p key="angle" value="0" valuetype="number" edittype="any">
</p>
<p key="alpha" value="1" valuetype="number" edittype="any">
</p>
<p key="visible" value="1" valuetype="boolean" edittype="boolean">
</p>
<p key="upSkin" value="resource/image/remain.png" valuetype="string" edittype="image">
</p>
<p key="downSkin" value="resource/image/remain.png" valuetype="string" edittype="image">
</p>
<p key="disableSkin" value="resource/image/remain.png" valuetype="string" edittype="image">
</p>
<p key="text" value="" valuetype="string" edittype="any">
</p>
</properties>
<customproperties></customproperties><behaviors></behaviors>
<children>
</children>
</object>
</children>
</object>
<object type="Layer" uiname="对象层">
<properties>
<p key="uiGuid" value="51" valuetype="string" edittype="any">
</p>
<p key="x" value="0" valuetype="number" edittype="any">
</p>
<p key="y" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorX" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorY" value="0" valuetype="number" edittype="any">
</p>
<p key="width" value="511" valuetype="number" edittype="any">
</p>
<p key="height" value="762" valuetype="number" edittype="any">
</p>
<p key="angle" value="0" valuetype="number" edittype="any">
</p>
<p key="alpha" value="1" valuetype="number" edittype="any">
</p>
<p key="visible" value="1" valuetype="boolean" edittype="boolean">
</p>
</properties>
<customproperties></customproperties><behaviors></behaviors>
<children>
<object type="AISprite" uiname="游戏结束标题">
<properties>
<p key="uiGuid" value="53" valuetype="string" edittype="any">
</p>
<p key="x" value="265.5" valuetype="number" edittype="any">
</p>
<p key="y" value="134.5" valuetype="number" edittype="any">
</p>
<p key="anchorX" value="0.5" valuetype="number" edittype="any">
</p>
<p key="anchorY" value="0.5" valuetype="number" edittype="any">
</p>
<p key="width" value="451" valuetype="number" edittype="any">
</p>
<p key="height" value="113" valuetype="number" edittype="any">
</p>
<p key="angle" value="0" valuetype="number" edittype="any">
</p>
<p key="alpha" value="1" valuetype="number" edittype="any">
</p>
<p key="visible" value="1" valuetype="boolean" edittype="boolean">
</p>
<p key="url" value="resource/image/game-over.png" valuetype="string" edittype="image">
</p>
<p key="collision" value="" valuetype="boolean" edittype="any">
</p>
</properties>
<customproperties></customproperties><behaviors></behaviors>
<children>
</children>
</object>
<object type="AIButton" uiname="再来一次">
<properties>
<p key="uiGuid" value="72" valuetype="string" edittype="any">
</p>
<p key="x" value="168" valuetype="number" edittype="any">
</p>
<p key="y" value="400" valuetype="number" edittype="any">
</p>
<p key="anchorX" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorY" value="0" valuetype="number" edittype="any">
</p>
<p key="width" value="177" valuetype="number" edittype="any">
</p>
<p key="height" value="58" valuetype="number" edittype="any">
</p>
<p key="angle" value="0" valuetype="number" edittype="any">
</p>
<p key="alpha" value="1" valuetype="number" edittype="any">
</p>
<p key="visible" value="1" valuetype="boolean" edittype="boolean">
</p>
<p key="upSkin" value="resource/image/restart.png" valuetype="string" edittype="image">
</p>
<p key="downSkin" value="resource/image/restart.png" valuetype="string" edittype="image">
</p>
<p key="disableSkin" value="resource/image/restart.png" valuetype="string" edittype="image">
</p>
<p key="text" value="" valuetype="string" edittype="any">
</p>
</properties>
<customproperties></customproperties><behaviors></behaviors>
<children>
</children>
</object>
</children>
</object>
</children>
</object>
<object type="Scene" uiname="MainScene">
<properties>
<p key="uiGuid" value="0" valuetype="string" edittype="any">
</p>
<p key="x" value="0" valuetype="number" edittype="any">
</p>
<p key="y" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorX" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorY" value="0" valuetype="number" edittype="any">
</p>
<p key="width" value="511" valuetype="number" edittype="any">
</p>
<p key="height" value="762" valuetype="number" edittype="any">
</p>
<p key="angle" value="0" valuetype="number" edittype="any">
</p>
<p key="alpha" value="1" valuetype="number" edittype="any">
</p>
<p key="visible" value="1" valuetype="boolean" edittype="boolean">
</p>
</properties>
<customproperties></customproperties><behaviors></behaviors>
<children>
<object type="Layer" uiname="背景层">
<properties>
<p key="uiGuid" value="2" valuetype="string" edittype="any">
</p>
<p key="x" value="0" valuetype="number" edittype="any">
</p>
<p key="y" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorX" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorY" value="0" valuetype="number" edittype="any">
</p>
<p key="width" value="511" valuetype="number" edittype="any">
</p>
<p key="height" value="762" valuetype="number" edittype="any">
</p>
<p key="angle" value="0" valuetype="number" edittype="any">
</p>
<p key="alpha" value="1" valuetype="number" edittype="any">
</p>
<p key="visible" value="1" valuetype="boolean" edittype="boolean">
</p>
</properties>
<customproperties></customproperties><behaviors></behaviors>
<children>
<object type="AISprite" uiname="背景">
<properties>
<p key="uiGuid" value="6" valuetype="string" edittype="any">
</p>
<p key="x" value="0" valuetype="number" edittype="any">
</p>
<p key="y" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorX" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorY" value="0" valuetype="number" edittype="any">
</p>
<p key="width" value="511" valuetype="number" edittype="any">
</p>
<p key="height" value="762" valuetype="number" edittype="any">
</p>
<p key="angle" value="0" valuetype="number" edittype="any">
</p>
<p key="alpha" value="1" valuetype="number" edittype="any">
</p>
<p key="visible" value="1" valuetype="boolean" edittype="boolean">
</p>
<p key="url" value="resource/image/bgGrey.png" valuetype="string" edittype="image">
</p>
<p key="collision" value="" valuetype="boolean" edittype="any">
</p>
</properties>
<customproperties></customproperties><behaviors></behaviors>
<children>
</children>
</object>
<object type="AIButton" uiname="开始游戏">
<properties>
<p key="uiGuid" value="12" valuetype="string" edittype="any">
</p>
<p key="x" value="168" valuetype="number" edittype="any">
</p>
<p key="y" value="400" valuetype="number" edittype="any">
</p>
<p key="anchorX" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorY" value="0" valuetype="number" edittype="any">
</p>
<p key="width" value="177" valuetype="number" edittype="any">
</p>
<p key="height" value="59" valuetype="number" edittype="any">
</p>
<p key="angle" value="0" valuetype="number" edittype="any">
</p>
<p key="alpha" value="1" valuetype="number" edittype="any">
</p>
<p key="visible" value="1" valuetype="boolean" edittype="boolean">
</p>
<p key="upSkin" value="resource/image/start.png" valuetype="string" edittype="image">
</p>
<p key="downSkin" value="resource/image/start.png" valuetype="string" edittype="image">
</p>
<p key="disableSkin" value="resource/image/start.png" valuetype="string" edittype="image">
</p>
<p key="text" value="" valuetype="string" edittype="any">
</p>
</properties>
<customproperties></customproperties><behaviors></behaviors>
<children>
</children>
</object>
<object type="AIButton" uiname="排行榜">
<properties>
<p key="uiGuid" value="85" valuetype="string" edittype="any">
</p>
<p key="x" value="168" valuetype="number" edittype="any">
</p>
<p key="y" value="548" valuetype="number" edittype="any">
</p>
<p key="anchorX" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorY" value="0" valuetype="number" edittype="any">
</p>
<p key="width" value="177" valuetype="number" edittype="any">
</p>
<p key="height" value="59" valuetype="number" edittype="any">
</p>
<p key="angle" value="0" valuetype="number" edittype="any">
</p>
<p key="alpha" value="1" valuetype="number" edittype="any">
</p>
<p key="visible" value="0" valuetype="boolean" edittype="boolean">
</p>
<p key="upSkin" value="resource/image/ranking.png" valuetype="string" edittype="image">
</p>
<p key="downSkin" value="resource/image/ranking.png" valuetype="string" edittype="image">
</p>
<p key="disableSkin" value="resource/image/ranking.png" valuetype="string" edittype="image">
</p>
<p key="text" value="" valuetype="string" edittype="any">
</p>
</properties>
<customproperties></customproperties><behaviors></behaviors>
<children>
</children>
</object>
</children>
</object>
<object type="Layer" uiname="UI层">
<properties>
<p key="uiGuid" value="8" valuetype="string" edittype="any">
</p>
<p key="x" value="0" valuetype="number" edittype="any">
</p>
<p key="y" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorX" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorY" value="0" valuetype="number" edittype="any">
</p>
<p key="width" value="511" valuetype="number" edittype="any">
</p>
<p key="height" value="762" valuetype="number" edittype="any">
</p>
<p key="angle" value="0" valuetype="number" edittype="any">
</p>
<p key="alpha" value="1" valuetype="number" edittype="any">
</p>
<p key="visible" value="1" valuetype="boolean" edittype="boolean">
</p>
</properties>
<customproperties></customproperties><behaviors></behaviors>
<children>
<object type="AISprite" uiname="AISprite9">
<properties>
<p key="uiGuid" value="10" valuetype="string" edittype="any">
</p>
<p key="x" value="25.567128463476084" valuetype="number" edittype="any">
</p>
<p key="y" value="54.42090680100758" valuetype="number" edittype="any">
</p>
<p key="anchorX" value="0" valuetype="number" edittype="any">
</p>
<p key="anchorY" value="0" valuetype="number" edittype="any">
</p>
<p key="width" value="451.0797930412778" valuetype="number" edittype="any">
</p>
<p key="height" value="154.63277756869374" valuetype="number" edittype="any">
</p>
<p key="angle" value="0" valuetype="number" edittype="any">
</p>
<p key="alpha" value="1" valuetype="number" edittype="any">
</p>
<p key="visible" value="1" valuetype="boolean" edittype="boolean">
</p>
<p key="url" value="resource/image/title.png" valuetype="string" edittype="image">
</p>
<p key="collision" value="" valuetype="boolean" edittype="any">
</p>
</properties>
<customproperties></customproperties><behaviors></behaviors>
<children>
</children>
</object>
</children>
</object>
</children>
</object>
</scenes>
</project>