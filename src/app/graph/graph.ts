import {
  Component,
  ElementRef,
  input,
  viewChild,
  effect
} from '@angular/core';

import { FunctionObject } from './graph.types';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Point} from './graph.types';
import {TaskLabelPipe} from '../task-label-pipe';

@Component({
  selector: 'app-graph',
  standalone: true,
  templateUrl: './graph.html',
  imports: [
    TaskLabelPipe
  ],
  styleUrl: './graph.css'
})
export class Graph {
  functionObject = input.required<FunctionObject>();
  private chartRef = viewChild<ElementRef<HTMLCanvasElement>>('chart');
  private chart: Chart | null = null;
  primaryColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-primary')
    .trim();

  secondaryColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-secondary')
    .trim();

  constructor() {
    effect(() => {
      const func = this.functionObject();
      const canvas = this.chartRef()?.nativeElement;

      if (!func || !canvas) return;

      queueMicrotask(() => {
        this.renderChart(func, canvas);
      });
    });
  }

  private generateData(
    a: number,
    b: number,
    c: number,
    xMin: number,
    xMax: number,
    step = 0.1
  ) {
    const data: Point[] = [];

    for (let x: number = xMin; x <= xMax; x += step) {
      data.push({
        x,
        y: a * x ** 2 + b * x + c
      });
    }

    return data;
  }

  private renderChart(func: FunctionObject, canvas: HTMLCanvasElement) {

    const { a, b, c } = func.content.parameters;
    const [vx, vy] = func.content.properties.vertex;
    const roots = func.content.properties.roots;

    const range = 6;
    let xMin: number;
    let xMax: number;
    let yMin: number;
    let yMax: number;

    const padding = 2;

    if (roots.length >= 2) {
      xMin = roots[0] - range / 2;
      xMax = roots[1] + range / 2;
    } else {
      xMin = vx - range;
      xMax = vx + range;
    }

    if (roots.length >= 1) {
      const minY = Math.min(vy, 0);
      const maxY = Math.max(vy, 0);

      yMin = minY - padding;
      yMax = maxY + padding;
    } else {
      yMin = vy - range;
      yMax = vy + range;
    }

    const data = this.generateData(a, b, c, xMin, xMax);

    const points: Point[] = [
      { x: 0, y: c },
      { x: vx, y: vy },
      ...roots.map(r => ({ x: r, y: 0 }))
    ];

    this.chart?.destroy();

    this.chart = new Chart(canvas, {
      plugins: [ChartDataLabels],
      type: 'line',
      data: {
        datasets: [
          {
            data: points,
            showLine: false,
            pointRadius: 8,
            pointBackgroundColor: this.primaryColor,
            datalabels: {
              align: (ctx) => {
                const point = ctx.dataset.data[ctx.dataIndex] as { x: number; y: number };

                if (!point) return 'top';
                const x = point.x;

                if (x > vx) return 'right';
                if (x < vx) return 'left';
                if (a > 0) return 'bottom';
                if (a < 0) return 'top';

                return 'top';
              },
              formatter: (_, ctx) => {
                const p = ctx.dataset.data[ctx.dataIndex] as any;
                return `(${p.x}, ${p.y})`;
              },
              color: 'black',
              font: { size: 10 },
              backgroundColor: 'rgba(255,255,255,0.8)',
              borderRadius: 4,
              padding: 4,
            }
          },
          {
            data,
            borderColor: this.secondaryColor,
            borderWidth: 5,
            pointRadius: 0,
            datalabels: {
              display: false
            }
          }
        ]
      },
      options: {
        animation: false,
        font: {
          family: "'Inter', system-ui, Arial, sans-serif"
        },
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: this.functionObject().content.forms.general.replace('^2', '²'),
            font: { family: "'Manrope', system-ui, Arial, sans-serif", size: 16 }
          }
        },
        aspectRatio: 1,
        scales: {
          x: {
            type: 'linear',
            min: Math.floor(xMin),
            max: Math.ceil(xMax),
            ticks: {
              stepSize: 1,
              callback: val => Number.isInteger(val) ? val : ''
            },
            grid: {
              color: ctx => ctx.tick.value === 0 ? '#757780' : '#ddd',
              lineWidth: ctx => ctx.tick.value === 0 ? 2 : 1
            }
          },
          y: {
            min: yMin,
            max: yMax,
            ticks: {
              stepSize: 1,
              callback: val => Number.isInteger(val) ? val : ''
            },
            grid: {
              color: ctx => ctx.tick.value === 0 ? '#757780' : '#ddd',
              lineWidth: ctx => ctx.tick.value === 0 ? 2 : 1
            }
          }
        }
      }
    });
  }
}
