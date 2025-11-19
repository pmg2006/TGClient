var Vue = require('vue');
var fs = require('fire-fs');
var path = require('fire-path');

let _template = fs.readFileSync(Editor.url("packages://search_scene_all_resouces/panel/index.html", "utf8")) + "";
Editor.Panel.extend({
    style: fs.readFileSync(Editor.url("packages://search_scene_all_resouces/panel/index.css", "utf8")) + "",
    template: _template,
    $: {
        select: '#select'
    },
    ready() {
        window.plugin = new Vue({
            el: this.shadowRoot,
            data: {
                sceneList: [],
                result_path: [],
                selectedValue: 0,
                assetDict: {},
                assetObj:null,
            },
            created () {
                Editor.log("hello");
                this.updateSceneList();
            },
            methods: {
                updateSceneList () {
                    Editor.log("开始查找");
                    var url = 'db://assets/**/*';
                    Editor.assetdb.queryAssets(url, 'scene', (err, assets) => {
                        if (!err) {
                            assets.forEach(function(asset) {
                                //Editor.log(asset.path); // 打印所有场景文件的路径
                                //Editor.log('UUID: ', asset.uuid); // 打印每个资产的 UUID
                            });

                            this.sceneList = assets.map((asset) => {
                                var actualPath = asset.path; // 打印所有场景文件的路径
                                
                                var newPath = actualPath.replace(/.*assets/, "db:/aasets");
                                newPath = newPath.replace(/\\/g, "/");

                                this.assetDict[newPath] = asset.uuid;

                                Editor.log(asset.uuid+"   "+newPath);
                                this.assetObj = asset;
                                return newPath;
                            });
                            Editor.log(this.sceneList);
                        } else {
                            Editor.log("查找失败");
                        }
                    });
                },
                onSceneChange (event) {
                    this.result_path = [];
                    let selectedItem = JSON.parse(event.target.value);
                    console.log('选中的值：', selectedItem.value);
                    console.log('选中的索引：', selectedItem.index);

                    this.selectedValue = event.target.index;

                },
                onBtnClick () {
                    var scene = this.sceneList[this.selectedValue];
                    Editor.log("选择的是场景:" + scene);                    
                    var uuid = this.assetDict[scene];
                    Editor.log("查找的UUID:" + uuid);
                    let s = Editor.Utils.getDependsRecursively(this.assetObj.uuid);
                    Editor.log(s);
                    Editor.assetdb.queryInfoByUuid(uuid, (err, info) => {
                        if (!err) {
                            Editor.log(info.dependUuids);
                            this.result_path = info.dependUuids.map((uuid) => {
                                return Editor.assetdb.uuidToUrl(uuid);
                            });
                        }
                    });
                },
            },
        });
    }
});

