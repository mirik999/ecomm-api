import { Injectable } from '@nestjs/common';
import { CpuResponse, OsInfoResponse } from './response/cpu.res';
const os = require('os');

@Injectable()
export class StatisticService {
  getOsInfo(): OsInfoResponse {
    const type =
      os.type() === 'Darwin'
        ? 'Mac'
        : os.type() === 'Windows_NT'
        ? 'Windows'
        : os.type();
    const memUsage =
      Math.floor(((os.totalmem() - os.freemem()) / os.totalmem()) * 100) / 100;
    return {
      type,
      memUsage,
      freeMem: os.freemem(),
      totalMem: os.totalmem(),
      upTime: os.uptime(),
    };
  }

  async getCpuInfo(): Promise<CpuResponse> {
    const cpus = os.cpus();
    const numCores = cpus.length;
    const cpuModel =
      cpus[0].model.split('CPU')[0] +
      'CPU'
        .split(' ')
        .slice(0, -3)
        .join(' ');
    return {
      cpuModel: cpuModel,
      cpuSpeed: cpus[0].speed,
      cpuCores: numCores,
      cpuLoad: await StatisticService.getCpuLoad(),
    };
  }

  private static async getCpuLoad() {
    return new Promise((res, rej) => {
      const start = StatisticService.handleCpuAverage();
      setTimeout(() => {
        const end = StatisticService.handleCpuAverage();
        const idleDiff = end.idle - start.idle;
        const totalDiff = end.total - start.total;
        const percentageCpu = 100 - Math.floor((100 * idleDiff) / totalDiff);
        res(percentageCpu);
      }, 100);
    });
  }

  private static handleCpuAverage() {
    const cpus = os.cpus();
    let idleMs = 0;
    let totalMs = 0;

    cpus.forEach(core => {
      for (let type in core.times) {
        totalMs += core.times[type];
      }
      idleMs += core.times.idle;
    });

    return {
      idle: idleMs / cpus.length,
      total: totalMs / cpus.length,
    };
  }
}
