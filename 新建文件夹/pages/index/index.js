// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 选中的晋级赛类型
    selectedCompetition: 'bronzeToSilver',
    selectedCompetitionText: '青铜 → 白银',
    // 选中的设备类型
    selectedDevice: 'android',
    // 选中的服务器类型
    selectedServer: 'wechat',
    // 价格
    totalPrice: 30,
    // 模态框显示状态
    showModal: false,
    // 表单数据
    formData: {
      account: '',
      phone: '',
      remark: ''
    },
    // 表单错误状态
    formErrors: {
      account: '',
      phone: '',
      remark: ''
    },
    // 价格配置
    priceConfig: {
      bronzeToSilver: 30,
      silverToGold: 50,
      goldToPlatinum: 80
    },
    // 系统状态
    isSubmitting: false,
    lastSubmitTime: 0,
    submitTimeout: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      // 页面加载时的初始化逻辑
      console.log('和平精英晋级赛服务页面加载成功');
      
      // 检查网络状态
      this.checkNetworkStatus();
    } catch (error) {
      console.error('页面加载时发生错误:', error);
      wx.showToast({
        title: '页面初始化失败，请重试',
        icon: 'error',
        duration: 2000
      });
    }
  },
  
  /**
   * 检查网络状态
   */
  checkNetworkStatus: function() {
    wx.getNetworkType({
      success: (res) => {
        const networkType = res.networkType;
        if (networkType === 'none') {
          wx.showToast({
            title: '当前无网络连接，请检查网络',
            icon: 'none',
            duration: 3000
          });
        }
      },
      fail: (error) => {
        console.error('获取网络状态失败:', error);
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 选择晋级赛类型
   */
  selectCompetition: function(e) {
    try {
      if (!e || !e.currentTarget || !e.currentTarget.dataset) {
        throw new Error('无效的事件参数');
      }
      
      const competitionType = e.currentTarget.dataset.type;
      const competitionText = e.currentTarget.dataset.text || '青铜 → 白银';
      
      // 验证competitionType值的有效性
      if (!competitionType || !this.data.priceConfig.hasOwnProperty(competitionType)) {
        wx.showToast({
          title: '选择的服务类型无效',
          icon: 'none'
        });
        return;
      }
      
      const price = this.data.priceConfig[competitionType];
      
      this.setData({
        selectedCompetition: competitionType,
        selectedCompetitionText: competitionText,
        totalPrice: price
      });
    } catch (error) {
      console.error('选择晋级赛类型时发生错误:', error);
      wx.showToast({
        title: '操作失败，请重试',
        icon: 'none'
      });
    }
  },

  /**
   * 选择设备类型
   */
  selectDevice: function(e) {
    try {
      if (!e || !e.currentTarget || !e.currentTarget.dataset) {
        throw new Error('无效的事件参数');
      }
      
      const deviceType = e.currentTarget.dataset.type;
      
      // 验证deviceType值的有效性
      if (!deviceType || (deviceType !== 'android' && deviceType !== 'ios')) {
        wx.showToast({
          title: '选择的设备类型无效',
          icon: 'none'
        });
        return;
      }
      
      this.setData({
        selectedDevice: deviceType
      });
    } catch (error) {
      console.error('选择设备类型时发生错误:', error);
      wx.showToast({
        title: '操作失败，请重试',
        icon: 'none'
      });
    }
  },

  /**
   * 选择服务器类型
   */
  selectServer: function(e) {
    try {
      if (!e || !e.currentTarget || !e.currentTarget.dataset) {
        throw new Error('无效的事件参数');
      }
      
      const serverType = e.currentTarget.dataset.type;
      
      // 验证serverType值的有效性
      if (!serverType || (serverType !== 'wechat' && serverType !== 'qq')) {
        wx.showToast({
          title: '选择的服务器类型无效',
          icon: 'none'
        });
        return;
      }
      
      this.setData({
        selectedServer: serverType
      });
    } catch (error) {
      console.error('选择服务器类型时发生错误:', error);
      wx.showToast({
        title: '操作失败，请重试',
        icon: 'none'
      });
    }
  },

  /**
   * 显示订单表单模态框
   */
  showOrderForm: function() {
    try {
      // 确保已选择服务类型
      if (!this.data.selectedCompetition) {
        wx.showToast({
          title: '请选择服务类型',
          icon: 'none',
          duration: 1500
        });
        return;
      }
      
      if (!this.data.selectedDevice) {
        wx.showToast({
          title: '请选择设备类型',
          icon: 'none',
          duration: 1500
        });
        return;
      }
      
      if (!this.data.selectedServer) {
        wx.showToast({
          title: '请选择服务器类型',
          icon: 'none',
          duration: 1500
        });
        return;
      }
      
      // 清除表单错误信息
      this.setData({
        formErrors: {
          account: '',
          phone: '',
          remark: ''
        }
      });
      
      this.setData({
        showModal: true
      });
      
      console.log('打开订单模态框');
    } catch (error) {
      console.error('打开订单模态框时发生错误:', error);
      wx.showToast({
        title: '操作失败，请重试',
        icon: 'none'
      });
    }
  },

  /**
   * 隐藏模态框
   */
  hideModal: function() {
    try {
      this.setData({
        showModal: false
      });
      
      // 清除表单错误
      this.setData({
        formErrors: {
          account: '',
          phone: '',
          remark: ''
        }
      });
      
      console.log('关闭订单模态框');
    } catch (error) {
      console.error('关闭模态框时发生错误:', error);
    }
  },

  /**
   * 处理游戏账号输入
   */
  inputAccount: function(e) {
    try {
      if (!e || !e.detail) {
        throw new Error('无效的事件参数');
      }
      
      const value = e.detail.value;
      
      this.setData({
        'formData.account': value
      });
      
      // 清除错误信息
      if (this.data.formErrors.account) {
        this.setData({
          'formErrors.account': ''
        });
      }
    } catch (error) {
      console.error('处理游戏账号输入时发生错误:', error);
    }
  },

  /**
   * 处理联系电话输入
   */
  inputPhone: function(e) {
    try {
      if (!e || !e.detail) {
        throw new Error('无效的事件参数');
      }
      
      const value = e.detail.value;
      
      this.setData({
        'formData.phone': value
      });
      
      // 清除错误信息
      if (this.data.formErrors.phone) {
        this.setData({
          'formErrors.phone': ''
        });
      }
      
      // 实时验证手机号格式
      if (value.length > 0) {
        this.validatePhone(value);
      }
    } catch (error) {
      console.error('处理联系电话输入时发生错误:', error);
    }
  },
  
  /**
   * 验证手机号
   */
  validatePhone: function(phone) {
    // 手机号格式验证（支持中国大陆手机号）
    const phoneRegex = /^1[3-9]\d{9}$/;
    
    if (!phone.trim()) {
      this.setData({
        'formErrors.phone': '请输入联系电话'
      });
      return false;
    } else if (!phoneRegex.test(phone.trim())) {
      this.setData({
        'formErrors.phone': '请输入正确的手机号码'
      });
      return false;
    } else {
      this.setData({
        'formErrors.phone': ''
      });
      return true;
    }
  },

  /**
   * 处理备注信息输入
   */
  inputRemark: function(e) {
    try {
      if (!e || !e.detail) {
        throw new Error('无效的事件参数');
      }
      
      const value = e.detail.value;
      
      this.setData({
        'formData.remark': value
      });
      
      // 清除错误信息
      if (this.data.formErrors.remark) {
        this.setData({
          'formErrors.remark': ''
        });
      }
    } catch (error) {
      console.error('处理备注信息输入时发生错误:', error);
    }
  },
  
  /**
   * 验证游戏账号
   */
  validateAccount: function(account) {
    if (!account.trim()) {
      this.setData({
        'formErrors.account': '请输入游戏账号'
      });
      return false;
    } else if (account.trim().length < 3 || account.trim().length > 30) {
      this.setData({
        'formErrors.account': '游戏账号长度应在3-30个字符之间'
      });
      return false;
    } else {
      this.setData({
        'formErrors.account': ''
      });
      return true;
    }
  },

  /**
   * 防止重复提交的检查
   */
  isDuplicateSubmission: function() {
    const currentTime = Date.now();
    const timeSinceLastSubmit = currentTime - this.data.lastSubmitTime;
    
    // 如果距离上次提交时间小于2秒，认为是重复提交
    if (timeSinceLastSubmit < 2000) {
      wx.showToast({
        title: '请勿重复提交',
        icon: 'none'
      });
      return true;
    }
    
    // 更新最后提交时间
    this.setData({
      lastSubmitTime: currentTime
    });
    return false;
  },
  
  /**
   * 全面验证表单
   */
  validateForm: function() {
    try {
      const { account, phone } = this.data.formData;
      
      // 验证所有字段
      const isAccountValid = this.validateAccount(account);
      const isPhoneValid = this.validatePhone(phone);
      
      // 检查是否所有验证都通过
      if (!isAccountValid) {
        wx.showToast({
          title: this.data.formErrors.account,
          icon: 'none',
          duration: 1500
        });
        return false;
      } else if (!isPhoneValid) {
        wx.showToast({
          title: this.data.formErrors.phone,
          icon: 'none',
          duration: 1500
        });
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('验证表单时发生错误:', error);
      wx.showToast({
        title: '表单验证失败，请重试',
        icon: 'none'
      });
      return false;
    }
  },
  
  /**
   * 生成订单ID
   */
  generateOrderId: function() {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `ORD${timestamp}${random}`;
  },
  
  /**
   * 格式化订单数据，准备发送到后端
   */
  formatOrderData: function() {
    try {
      const orderId = this.generateOrderId();
      const orderTime = new Date().toISOString();
      
      const orderData = {
        orderId: orderId,
        orderTime: orderTime,
        serviceInfo: {
          competitionType: this.data.selectedCompetition,
          competitionText: this.data.selectedCompetitionText,
          deviceType: this.data.selectedDevice,
          serverType: this.data.selectedServer
        },
        pricingInfo: {
          unitPrice: this.data.totalPrice,
          totalPrice: this.data.totalPrice,
          currency: 'CNY'
        },
        customerInfo: {
          gameAccount: this.data.formData.account,
          phoneNumber: this.data.formData.phone,
          remark: this.data.formData.remark || ''
        },
        orderStatus: 'PENDING',
        platformInfo: {
          os: wx.getSystemInfoSync().platform,
          version: wx.getSystemInfoSync().version
        }
      };
      
      return orderData;
    } catch (error) {
      console.error('格式化订单数据时发生错误:', error);
      throw error;
    }
  },
  
  /**
   * 发送订单到后端服务器
   */
  sendOrderToServer: function(orderData) {
    return new Promise((resolve, reject) => {
      try {
        console.log('准备发送订单数据到后端:', orderData);
        
        // 这里是实际发送请求到后端的代码
        // 因为是模拟环境，我们使用setTimeout模拟网络请求
        
        // 模拟网络延迟
        setTimeout(() => {
          // 模拟请求成功的情况
          const response = {
            success: true,
            orderId: orderData.orderId,
            message: '订单提交成功',
            timestamp: Date.now()
          };
          
          // 可以根据需要模拟请求失败的情况
          // const response = {
          //   success: false,
          //   errorCode: 'SERVER_ERROR',
          //   message: '服务器暂时不可用，请稍后再试',
          //   timestamp: Date.now()
          // };
          
          console.log('后端响应:', response);
          
          if (response.success) {
            resolve(response);
          } else {
            reject(new Error(response.message || '服务器响应失败'));
          }
        }, 1500);
        
        // 实际项目中的请求代码示例：
        /*
        wx.request({
          url: 'https://your-api-domain.com/api/orders/submit',
          method: 'POST',
          data: orderData,
          header: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + wx.getStorageSync('token') // 如果需要认证
          },
          success: (res) => {
            if (res.statusCode === 200 && res.data && res.data.success) {
              resolve(res.data);
            } else {
              reject(new Error(res.data?.message || '请求失败，请重试'));
            }
          },
          fail: (error) => {
            console.error('网络请求失败:', error);
            reject(new Error('网络连接失败，请检查网络后重试'));
          },
          complete: () => {
            // 请求完成后的处理，如清除loading状态等
          }
        });
        */
      } catch (error) {
        console.error('构建请求时发生错误:', error);
        reject(error);
      }
    });
  },
  
  /**
   * 保存订单到本地存储
   */
  saveOrderToLocal: function(orderData, response) {
    try {
      // 获取本地已有的订单列表
      const savedOrders = wx.getStorageSync('savedOrders') || [];
      
      // 添加到订单列表
      const orderRecord = {
        orderId: orderData.orderId,
        orderTime: orderData.orderTime,
        serviceInfo: orderData.serviceInfo,
        totalPrice: orderData.pricingInfo.totalPrice,
        orderStatus: 'PENDING',
        response: response
      };
      
      savedOrders.unshift(orderRecord); // 添加到列表开头
      
      // 限制保存的订单数量，只保留最近10条
      if (savedOrders.length > 10) {
        savedOrders.splice(10);
      }
      
      // 保存回本地存储
      wx.setStorageSync('savedOrders', savedOrders);
      console.log('订单已保存到本地存储');
    } catch (error) {
      console.error('保存订单到本地存储失败:', error);
      // 这里不抛出错误，因为本地存储失败不应该影响订单流程
    }
  },
  
  /**
   * 提交订单
   */
  submitOrder: async function() {
    try {
      // 防止重复提交
      if (this.isDuplicateSubmission()) {
        return;
      }
      
      // 验证是否正在提交中
      if (this.data.isSubmitting) {
        wx.showToast({
          title: '订单正在提交中，请稍候',
          icon: 'none'
        });
        return;
      }
      
      // 验证表单
      if (!this.validateForm()) {
        return;
      }
      
      // 设置提交中状态
      this.setData({
        isSubmitting: true
      });
      
      wx.showLoading({
        title: '提交中...',
        mask: true // 显示透明蒙层，防止触摸穿透
      });
      
      // 格式化订单数据
      const orderData = this.formatOrderData();
      
      try {
        // 发送订单到服务器
        const response = await this.sendOrderToServer(orderData);
        
        // 保存订单到本地（可选，用于展示历史订单）
        this.saveOrderToLocal(orderData, response);
        
        // 请求成功，处理响应
        wx.hideLoading();
        
        console.log('订单提交成功，订单ID:', response.orderId);
        
        // 显示成功提示
        wx.showToast({
          title: '订单提交成功',
          icon: 'success',
          duration: 2000,
          success: () => {
            // 隐藏模态框
            setTimeout(() => {
              this.hideModal();
              
              // 重置表单数据
              this.setData({
                formData: {
                  account: '',
                  phone: '',
                  remark: ''
                }
              });
              
              // 可以选择是否重置服务选择
              // this.setData({
              //   selectedCompetition: null,
              //   selectedDevice: null,
              //   selectedServer: null,
              //   totalPrice: 0
              // });
            }, 2000);
          }
        });
        
      } catch (error) {
        // 请求失败，处理错误
        console.error('订单提交失败:', error);
        
        wx.hideLoading();
        
        // 根据错误类型显示不同的提示
        if (error.message.includes('网络')) {
          wx.showToast({
            title: '网络连接失败，请检查网络后重试',
            icon: 'none',
            duration: 2000
          });
        } else if (error.message.includes('服务器')) {
          wx.showToast({
            title: error.message,
            icon: 'none',
            duration: 2000
          });
        } else {
          wx.showToast({
            title: '订单提交失败，请稍后重试',
            icon: 'none',
            duration: 2000
          });
        }
      } finally {
        // 无论成功失败，都要重置提交状态
        this.setData({
          isSubmitting: false
        });
      }
      
    } catch (error) {
      console.error('提交订单时发生错误:', error);
      
      // 重置提交状态
      this.setData({
        isSubmitting: false
      });
      
      wx.hideLoading();
      wx.showToast({
        title: '提交失败，请重试',
        icon: 'none'
      });
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 刷新页面数据
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    try {
      return {
        title: '和平精英晋级赛服务',
        path: '/pages/index/index'
      };
    } catch (error) {
      console.error('分享时发生错误:', error);
      return {};
    }
  },
  
  /**
   * 页面卸载时的清理工作
   */
  onUnload: function() {
    try {
      // 清除超时计时器
      if (this.data.submitTimeout) {
        clearTimeout(this.data.submitTimeout);
      }
      console.log('页面卸载，清理资源');
    } catch (error) {
      console.error('页面卸载清理时发生错误:', error);
    }
  }
})