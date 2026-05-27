# S12 材料

【AI芯片行业报告（节选）】

---

第一章：行业概述

AI芯片（Artificial Intelligence Chip）是专门用于加速人工智能计算的集成电路。
与传统CPU（Central Processing Unit）不同，AI芯片针对矩阵运算、向量计算等
AI workloads进行了专门优化。

主流AI芯片类型包括：
- GPU（Graphics Processing Unit）：图形处理器，最早用于游戏渲染，
  后因并行计算能力强被广泛用于AI训练。代表厂商：NVIDIA（A100、H100、B200）
- TPU（Tensor Processing Unit）：张量处理器，Google自研，
  专为TensorFlow框架优化。
- NPU（Neural Processing Unit）：神经网络处理器，
  主要用于端侧AI（手机、汽车）。代表：苹果A系列芯片中的NPU、华为昇腾。
- FPGA（Field Programmable Gate Array）：现场可编程门阵列，
  可灵活定制，适合算法快速迭代的场景。
- ASIC（Application Specific Integrated Circuit）：专用集成电路，
  为特定算法定制，能效比最高但灵活性最低。

---

第二章：技术架构

AI芯片的核心指标：
- FLOPS（Floating Point Operations Per Second）：每秒浮点运算次数，
  衡量计算性能。常用单位：TFLOPS（万亿次）、PFLOPS（千万亿次）。
- TOPS（Tera Operations Per Second）：每秒万亿次运算，
  常用于衡量整数运算性能（如NPU）。
- 显存带宽（Memory Bandwidth）：芯片与显存之间的数据传输速度，
  单位GB/s。AI训练对带宽要求极高。
- 制程工艺（Process Node）：芯片制造的精细度，单位纳米（nm）。
  数字越小，集成度越高、功耗越低。目前先进制程为3nm/5nm。
- 晶体管数量（Transistor Count）：芯片上集成的晶体管数量，
  反映集成度。NVIDIA H100约有800亿个晶体管。

---

第三章：市场格局

训练市场（Training）：
- 主导者：NVIDIA，市占率约80-90%
- 挑战者：AMD（MI300X）、Intel（Gaudi）、Google（TPU v5）

推理市场（Inference）：
- 云端推理：NVIDIA、AMD、自研芯片（如Amazon Trainium）
- 边缘推理（Edge）：高通（骁龙）、苹果（A系列/M系列）、华为（昇腾）

国产化：
- 华为昇腾（Ascend）：910B用于训练，310用于推理
- 寒武纪（Cambricon）：思元系列
- 海光信息：DCU系列
- 壁仞科技：BR系列
- 摩尔线程：MTT系列

---

第四章：产业链

上游：
- EDA（Electronic Design Automation）：电子设计自动化软件，
  芯片设计必需工具。三巨头：Synopsys、Cadence、Siemens EDA。
- IP核（Intellectual Property Core）：芯片设计中的可复用模块。
  ARM公司主要提供CPU IP授权。
- 半导体设备：光刻机（ASML）、刻蚀机、薄膜沉积设备等。
- 晶圆制造（Foundry）：台积电（TSMC）、三星、中芯国际（SMIC）。

中游：
- Fabless（无晶圆厂）：只设计芯片，不制造。如NVIDIA、高通、华为海思。
- IDM（Integrated Device Manufacturer）：设计+制造一体化。如Intel、三星。

下游：
- 云厂商：AWS、Azure、Google Cloud、阿里云、腾讯云
- 车企：特斯拉（自研Dojo）、蔚来（自研神玑）
- 手机厂商：苹果、华为、小米

---

第五章：关键概念

- 大模型（LLM, Large Language Model）：参数量巨大的神经网络模型，
  如GPT-4（约1.8万亿参数）。
- 参数（Parameter）：神经网络中的可训练变量，参数越多，模型能力越强。
- 训练（Training）：用大量数据调整模型参数的过程，计算量巨大。
- 推理（Inference）：用训练好的模型进行预测，计算量较小但对延迟敏感。
- 算力集群（Compute Cluster）：由大量AI芯片组成的服务器集群，
  用于训练大模型。如NVIDIA DGX系统。
- 光模块（Optical Module）：用于数据中心内部高速数据传输，
  是算力集群的重要配套。
- 液冷（Liquid Cooling）：用液体代替空气进行散热，
  用于高密度算力集群（如NVIDIA DGX B200）。
- 国产替代（Import Substitution）：用国产芯片替代进口芯片，
  受地缘政治和供应链安全驱动。
- 算力租赁（Cloud GPU Rental）：通过云服务租用GPU算力，
  如NVIDIA DGX Cloud、CoreWeave。
