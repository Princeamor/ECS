#!/bin/bash

# 设置JVM参数
JVM_OPTS="-server -XX:+UseZGC -XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0 -Xms256m -Xmx4g -Xss1m"

# 激活Spring配置文件
SPRING_PROFILES_ACTIVE="prod-ehox"

# 应用程序JAR文件名，从环境变量中获取
JAR_FILE="chitu-admin-encrypted.jar"

# 进入应用程序目录
cd /opt/apps

# 启动Java应用程序
java ${JVM_OPTS} -javaagent:${JAR_FILE} -jar ${JAR_FILE} --spring.profiles.active=${SPRING_PROFILES_ACTIVE}
