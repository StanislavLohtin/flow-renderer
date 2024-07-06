import {Component, OnInit} from '@angular/core';
import {GetFlowsService} from "../get-flows.service";

@Component({
  selector: 'app-json-renderer',
  template: `
    <div class="group-container" *ngFor="let group of groupedEntries | keyvalue">
      <h2 class="group-header">{{ group.key }}</h2>
      <div class="entries-container">
        <div *ngFor="let entry of group.value | keyvalue" class="entry" id="{{ entry.key }}">
          <h3>{{ entry.key }}</h3>
          <div class="actions">
            <h4>Actions:</h4>
            <ng-container *ngTemplateOutlet="actionList; context:{actions: entry.value.actions}"></ng-container>
          </div>
          <div class="labels" *ngIf="entry.value.labels">
            <h4>Labels:</h4>
            <ul>
              <li *ngFor="let label of entry.value.labels">{{ label }}</li>
            </ul>
          </div>
          <div class="keywords" *ngIf="entry.value.keywords">
            <h4>Keywords:</h4>
            <ul>
              <li *ngFor="let keyword of entry.value.keywords">{{ keyword }}</li>
            </ul>
          </div>
          <div class="secondaryKeywords" *ngIf="entry.value.secondaryKeywords">
            <h4>Secondary Keywords:</h4>
            <ul>
              <li *ngFor="let keyword of entry.value.secondaryKeywords">{{ keyword }}</li>
            </ul>
          </div>
          <div class="refKeywords" *ngIf="entry.value.refKeywords">
            <h4>Ref Keywords:</h4>
            <ul>
              <li *ngFor="let keyword of entry.value.refKeywords">{{ keyword }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <ng-template #actionList let-actions="actions">
      <div class="nested-actions">
        <ng-container *ngFor="let action of actions">
          <div class="action-block">
            <span class="action-chip" [ngClass]="getActionClass(action.type)">{{ action.type }}</span>
            <ng-container [ngSwitch]="action.type">
              <span *ngSwitchCase="'track'">{{ action.name }}</span>
              <span *ngSwitchCase="'say'">{{ action.text }}</span>
              <span *ngSwitchCase="'includeActions'">
                from <a [href]="'#' + action.from" class="action-link" (click)="highlightTarget(action.from)">{{ action.from }}</a>
              </span>
              <span *ngSwitchCase="'varSet'">{{ action.var }} = {{ action.value | json }}</span>
              <div *ngSwitchCase="'if'">
                <div>Condition: {{ action.condition | json }}</div>
                <div *ngIf="action.thenActions">
                  <strong>Then:</strong>
                  <ng-container *ngTemplateOutlet="actionList; context:{actions: action.thenActions}"></ng-container>
                </div>
                <div *ngIf="action.elseActions">
                  <strong>Else:</strong>
                  <ng-container *ngTemplateOutlet="actionList; context:{actions: action.elseActions}"></ng-container>
                </div>
              </div>
              <div *ngSwitchCase="'switch'">
                <div>Match mode: {{ action.matchMode }}</div>
                <div *ngFor="let case of action.cases">
                  <strong>Case:</strong>
                  <div>Condition: {{ case.condition | json }}</div>
                  <ng-container *ngTemplateOutlet="actionList; context:{actions: case.actions}"></ng-container>
                </div>
                <div *ngIf="action.defaultActions">
                  <strong>Default:</strong>
                  <ng-container *ngTemplateOutlet="actionList; context:{actions: action.defaultActions}"></ng-container>
                </div>
              </div>
              <div *ngSwitchCase="'loop'">
                <div>List: {{ action.list | json }}</div>
                <div>Item: {{ action.item }}</div>
                <ng-container *ngTemplateOutlet="actionList; context:{actions: action.actions}"></ng-container>
              </div>
              <div *ngSwitchCase="'recognize'">
                <div>Presets: {{ action.presets | json }}</div>
                <div>Valid Entries:
                  <span *ngFor="let entry of action.validEntries; let last = last">
                    <a [href]="'#' + entry" class="action-link" (click)="highlightTarget(entry)">{{ entry }}</a>{{ last ? '' : ', ' }}
                  </span>
                </div>
                <div *ngIf="action.onEditGoto">
                  On Edit Goto: <a [href]="'#' + action.onEditGoto" class="action-link" (click)="highlightTarget(action.onEditGoto)">{{ action.onEditGoto }}</a>
                </div>
              </div>
              <div *ngSwitchCase="'jump'">
                Goto: <a [href]="'#' + action.goto" class="action-link" (click)="highlightTarget(action.goto)">{{ action.goto }}</a>
              </div>
              <div *ngSwitchCase="'buttons'">
                <div *ngFor="let button of action.buttons">
                  <div>Label: {{ button.label }}</div>
                  <div>URL: {{ button.url }}</div>
                  <div *ngIf="button.imageUrl">Image URL: {{ button.imageUrl }}</div>
                </div>
              </div>
              <span *ngSwitchDefault>{{ action | json }}</span>
            </ng-container>
          </div>
        </ng-container>
      </div>
    </ng-template>
  `,
  styles: [`
    @keyframes highlightAnimation {
      0% {
        background-color: #ffff99;
      }
      100% {
        background-color: transparent;
      }
    }

    .highlight {
      animation: highlightAnimation 2s ease-out;
    }

    .group-container {
      margin-bottom: 30px;
    }

    .group-header {
      font-size: 24px;
      color: #2c3e50;
      margin-bottom: 15px;
    }

    .entries-container {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }

    .entry {
      width: calc(20% - 16px);
      margin-bottom: 20px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-sizing: border-box;
      overflow-wrap: break-word;
      word-wrap: break-word;
      hyphens: auto;
    }

    h3 {
      color: #333;
      font-size: 18px;
      margin-bottom: 10px;
    }

    h4 {
      color: #666;
      font-size: 16px;
      margin-top: 15px;
      margin-bottom: 5px;
    }

    .action-block {
      margin-bottom: 10px;
      padding: 5px;
      border-radius: 3px;
    }

    .action-chip {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 16px;
      color: white;
      font-weight: bold;
      margin-right: 8px;
    }

    .action-track {
      background-color: #3498db;
    }

    .action-say {
      background-color: #2ecc71;
    }

    .action-includeactions {
      background-color: #e67e22;
    }

    .action-if {
      background-color: #e74c3c;
    }

    .action-varset {
      background-color: #9b59b6;
    }

    .action-switch {
      background-color: #34495e;
    }

    .action-loop {
      background-color: #1abc9c;
    }

    .action-recognize {
      background-color: #f1c40f;
    }

    .action-httpcall {
      background-color: #5897f4;
    }

    .action-jump {
      background-color: #d35400;
    }

    .action-buttons {
      background-color: #27ae60;
    }

    .nested-actions {
      margin-left: 20px;
      border-left: 2px solid #ccc;
      padding-left: 10px;
    }

    .action-link {
      font-size: 0.9em;
      color: #3498db;
      text-decoration: none;
    }

    .action-link:hover {
      text-decoration: underline;
    }
  `]
})
export class JsonRendererComponent implements OnInit {
  entries: any;
  groupedEntries: { [key: string]: { [key: string]: any } } = {};


  constructor(private getFlowsService: GetFlowsService) {
  }

  ngOnInit() {
    // Your JSON data here
    this.entries = this.getFlowsService.getFlows();
    this.groupEntries();
  }

  groupEntries() {
    for (const [key, value] of Object.entries(this.entries)) {
      const [group] = key.split('::');
      if (!this.groupedEntries[group]) {
        this.groupedEntries[group] = {};
      }
      this.groupedEntries[group][key] = value;
    }
  }
  highlightTarget(targetId: string) {
    setTimeout(() => {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.classList.add('highlight');
        setTimeout(() => {
          targetElement.classList.remove('highlight');
        }, 2000);
      }
    }, 100);
  }

  getActionClass(actionType: string): string {
    return 'action-' + actionType.toLowerCase();
  }
}
