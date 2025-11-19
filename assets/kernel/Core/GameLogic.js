

const GameLogic = {


	//删除游戏
	onDelGame(moduleEnName) {
		console.log("onDelGame", moduleEnName)
		var _storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'subgame/' + moduleEnName + "/");
		jsb.fileUtils.removeDirectory(_storagePath);
	},



	getUserInfo() {
		let session = this.GetSession()
		var userinfo = null
		var userID = session.userID
		var uuid = session.uuid
		if (!!userID && !!uuid) {
			userinfo = { userID, uuid: uuid }
		}
		return userinfo
	},





	//获取本地所有账号
	getAllAccountInfo() {
		if (this.accountInfo == null) {
			this.accountInfo = {}
			var userinfoJson = cc.sys.localStorage.getItem('accountInfo');
			if (!!userinfoJson) {
				this.accountInfo = JSON.parse(userinfoJson)
			}
		}
		return this.accountInfo
	},

	addAccountInfo(info) {
		let accountInfo = this.getAllAccountInfo()
		accountInfo[info.userID] = info
		this.accountInfo = accountInfo
		cc.sys.localStorage.setItem("accountInfo", JSON.stringify(accountInfo));

	},

	delAccountInfo(userID) {
		let accountInfo = this.getAllAccountInfo()
		delete accountInfo[userID]
		this.accountInfo = accountInfo
		cc.sys.localStorage.setItem("accountInfo", JSON.stringify(accountInfo));
	},


	// 复制到剪切板
	copyToClipBoard(str) {
		if (cc.sys.isNative) {
			jsb.copyTextToClipboard(str);
			return true
		} else if (cc.sys.isBrowser) {
			var textArea = null;
			textArea = document.getElementById("clipBoard");
			if (textArea === null) {
				textArea = document.createElement("textarea");
				textArea.id = "clipBoard";
				textArea.textContent = str;
				document.body.appendChild(textArea);
			}
			textArea.select();
			try {
				const msg = document.execCommand('copy') ? 'successful' : 'unsuccessful';
				cc.log("已经复制到剪贴板");
				document.body.removeChild(textArea);
				return true
			} catch (err) {
				cc.log("复制到剪贴板失败");
			}
		}
	}


}

module.exports = GameLogic;