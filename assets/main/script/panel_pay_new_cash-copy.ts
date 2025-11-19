// /**
//  * 现金充值信息收集
//  */

// import { CONNECTION_CONFIG, SUBMIT_LOGS } from "../../kernel/Core/extend/ConstDefine";
// import Utils from "../../kernel/Core/extend/Utils";
// import { i18nMgr } from "../../kernel/i18n/i18nMgr";
// import { AudioControl } from "./AudioControl";

// const { ccclass, property } = cc._decorator;

// @ccclass
// export default class panel_pay_new_cash extends cc.Component {

//     @property(cc.EditBox)
//     userName: cc.EditBox = null;

//     @property(cc.EditBox)
//     phone: cc.EditBox = null;

//     @property(cc.EditBox)
//     email: cc.EditBox = null;

//     @property(cc.EditBox)  //身份证
//     cpfId: cc.EditBox = null;

//     @property(cc.EditBox)
//     pixId: cc.EditBox = null;

//     @property(cc.EditBox) //加密账户--密码
//     encrypted: cc.EditBox = null;

//     @property(cc.EditBox)
//     username: cc.EditBox = null;


//     @property(cc.Label)   //账户总金额
//     totalBonus:cc.Label = null; 
//     @property(cc.Label)   //账户可体现金额
//     cashBonus:cc.Label = null;

//     @property(cc.EditBox)
//     inputAmount: cc.EditBox = null;
//     // onLoad () {}
//     bindObj = [];
//     start() {
//         this.totalBonus.string = "R$"+ KernelData.score.toFixed(2);
//         this.cashBonus.string = "R$"+Math.min( KernelData.score, KernelData.withdrawAbleScore).toFixed(2);

//         // 监听 EditingDidEnded 事件
//         this.inputAmount.node.on('editing-did-ended', function () {
//             // 获取用户输入的字符串
//             let inputStr = parseFloat(this.inputAmount.string);
//             this.inputAmount.string = Math.floor(Math.min(inputStr, KernelData.withdrawAbleScore)).toString();
//         }, this);

//         this.email.string = KernelData.bankaccount?.email || KernelData.mail || "";
//         this.cpfId.string = "";
//         this.phone.string = KernelData.bankaccount?.phone || KernelData.mobile || "";
//         this.pixId.string = KernelData.bankaccount?.walletId || "";
//         this.username.string = KernelData.bankaccount?.userName || "";

//         this.bindEvent();
//     }

//     bindEvent(){
//         this.bindObj.push(onfire.on("S_USER_PROP_CHANGED", this.onS_USER_PROP_CHANGED.bind(this)))
//     }

//     onS_USER_PROP_CHANGED(data) {
//         console.log("玩家属性变化通知 cash", JSON.stringify(data));
//         if ("withdrawAbleScore" in data) {
//             // this.diamond.string = data.diamond;
//             this.cashBonus.string = GameTools.convertInfo(KernelData.withdrawAbleScore);
//         }
//     }

//     //by_009:按钮点击事件
//     btnOnClick(event) {
//         AudioControl.playClick();

//         let phone = this.phone.string;
//         let pixCPF = this.pixId.string;
//         let pixPasswd = this.cpfId.string;

//         let email = this.email.string;
//         let username = this.username.string;


//         let amount = parseFloat(this.inputAmount.string);
//         if (!amount || amount <= 0) {
//             GD.GameTool.showTextTips("Por favor, insira um valor maior ou igual a 0");
//             return;
//         }

//         if (!Utils.checkMobile(phone)) return;
        
//         if (!this.checkPixCPF(pixCPF)) return;
//         if (this.cpfId.string.length <=0) {
//             GD.GameTool.showTextTips("A senha Pix não pode estar vazia");
//             return;
//         }
//         //if (!panel_pay_new_cash.checkCPF(cpfId)) return;

//         let userInfo: any = {}
//         userInfo.phone = phone;
//         userInfo.cpf = pixCPF;
//         userInfo.walletId = pixCPF;
//         userInfo.remark = pixPasswd;

//         userInfo.email = email;
//         userInfo.userName = username;
//         userInfo.amount = amount;

//         let url = CONNECTION_CONFIG.yanzhengAddr + SUBMIT_LOGS;
//         let msg = {
//             userID: KernelData.userID,
//             msg: "withdraw " + JSON.stringify(userInfo),
//         };
//         Utils.httpRequest(url, 'POST', msg);
        
//         UIHelper.showWaitLayer(true);
//         NetHelp.withdraw(userInfo, (ret) => {
//             UIHelper.showWaitLayer(false);
//             let { code, info } = ret;
//             if (code != 0 && info) {
//                 UIHelper.MessageBox(info, () => {
//                 })
//                 return;
//             } else {
//                 UIHelper.MessageBox("Solicitação de saque bem-sucedida, aguardando revisão do back-end", () => {
//                 })
//             }
//         })
//     }

  
//     checkUserName(userName) {
//         if (userName.length == 0) {
//             GD.GameTool.showTextTips("Nome de usuário não pode estar vazio!");
//             return false;
//         } else {
//             return true;
//         }
//     }
//     // 检测 PIX的CPF 必须是11位的
//     checkPixCPF(pixCPF) {
//         if (pixCPF.length != 11 && pixCPF.length != 14) {
//             GD.GameTool.showTextTips("Chave Pix (CPF) deve ter 11 ou 14 dígitos");
//             return false;
//         } else {
//             return true;
//         }
//     }

//     formatCPF(cpf) {
//         if (cpf.includes('.')) {
//             return cpf;
//         } else {
//             let cpfArray = cpf.split('');
//             cpfArray.splice(3, 0, '.');
//             cpfArray.splice(7, 0, '.');
//             cpfArray.splice(11, 0, '-');
//             return cpfArray.join('');
//         }
//     }

//     public static checkCPF(CPF) {
//         if (CPF.length != 11 && CPF.length != 14) {
//             GD.GameTool.showTextTips("CPF deve ter 11 ou 14 dígitos");
//             return false;
//         } else {
//             return true;
//         }
//     }

//     checkEncrypted(encrypted) {
//         if (encrypted.length == 0) {
//             GD.GameTool.showTextTips("Conta criptografada não pode estar vazia!");
//             return false;
//         } else {
//             return true;
//         }
//     }

//     calculateDigit(cpf: string, factor: number): number {
//         let total = 0;
      
//         for (const digit of cpf) {
//           if (factor > 1) total += parseInt(digit) * factor--;
//         }
      
//         const remainder = total % 11;
//         return (remainder < 2) ? 0 : 11 - remainder;
//       }
      
//       generateCompleteCPF(cpfWithNineDigits: string): string {
//         const cpfArray = cpfWithNineDigits.split('').map(digit => parseInt(digit));
//         const firstDigit = this.calculateDigit(cpfWithNineDigits, 10);
//         cpfArray.push(firstDigit);
//         const secondDigit = this.calculateDigit(cpfArray.join(''), 11);
//         cpfArray.push(secondDigit);
      
//         return cpfArray.join('');
//       }
      
//     //   // Example usage:
//     //   const firstNineDigits = '111230656'; // Example 9-digit CPF string
//     //   const completeCPF = generateCompleteCPF(firstNineDigits);
//     //   console.log(completeCPF); // Outputs the complete CPF with 11 digits
      

// }
