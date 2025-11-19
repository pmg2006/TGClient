

// 注销所有已注册的服务工作器
if ('serviceWorker' in navigator) {
    console.log('检测到 serviceWorker，开始注销所有注册的服务工作器。');
    navigator.serviceWorker.getRegistrations().then(registrations => {
        for (const registration of registrations) {
            console.log('正在注销服务工作器：', registration);
            registration.unregister().then(success => {
                if (success) {
                    console.log('服务工作器注销成功：', registration);
                } else {
                    console.log('服务工作器注销失败：', registration);
                }
            });
        } 
    }).catch(error => {
        console.error('获取服务工作器注册信息失败：', error);
    });
}
