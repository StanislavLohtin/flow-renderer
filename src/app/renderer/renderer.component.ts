import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-renderer',
  template: `
    <div *ngFor="let entry of entries | keyvalue" class="entry">
      <h2>{{ entry.key }}</h2>
      <div class="actions">
        <h3>Actions:</h3>
        <pre>{{ entry.value.actions | json }}</pre>
      </div>
      <div class="labels" *ngIf="entry.value.labels">
        <h3>Labels:</h3>
        <ul>
          <li *ngFor="let label of entry.value.labels">{{ label }}</li>
        </ul>
      </div>
      <div class="keywords" *ngIf="entry.value.keywords">
        <h3>Keywords:</h3>
        <ul>
          <li *ngFor="let keyword of entry.value.keywords">{{ keyword | json }}</li>
        </ul>
      </div>
      <div class="secondaryKeywords" *ngIf="entry.value.secondaryKeywords">
        <h3>Secondary Keywords:</h3>
        <ul>
          <li *ngFor="let keyword of entry.value.secondaryKeywords">{{ keyword }}</li>
        </ul>
      </div>
      <div class="refKeywords" *ngIf="entry.value.refKeywords">
        <h3>Ref Keywords:</h3>
        <ul>
          <li *ngFor="let keyword of entry.value.refKeywords">{{ keyword }}</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .entry {
      margin-bottom: 20px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    h2 {
      color: #333;
    }
    h3 {
      color: #666;
    }
    pre {
      background-color: #f5f5f5;
      padding: 10px;
      border-radius: 3px;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  `]
})
export class RendererComponent implements OnInit {
  entries: any;

  ngOnInit() {
    // You would typically get this data from a service
    this.entries = {
      "UserData": {
        "actions": [
          {"type": "track", "name": "bundle_UserData", "meta": {"Eingabe": {"$var": "lastRecognize"}}},
          {"type": "say", "text": "Bei einer Datenänderung sind Ihnen meine menschlichen Kollegen gerne behilflich.", "sleepBefore": 1000},
          {"type": "includeActions", "from": "CustomerService"}
        ],
        "labels": [
          "bundle.newmodel::userdata"
        ],
        "keywords": [
          "Datenänderung", "ändern", "Änderung", ["(Vertragsbeginn|Beginn|Start|Datum)", "(ändern|schieben)"], ["(neue|ander|falsch)", "(Name|Adresse|Daten|Nachname)"]
        ]
      },
      "OrderId": {
        "actions": [
          {"type": "if", "condition": {"var_OrderId": null}, "thenActions": [
              {"type": "say", "text": "Ihre Auftragsnummer finden Sie in Ihrer Bestellbestätigung von CHECK24.", "sleepBefore": 1000},
              {"type": "includeActions", "from": "Question::Outro"}
            ], "elseActions": [
              {"type": "say", "text": "Ihre Auftragsnummer lautet {%var_OrderId}.", "sleepBefore": 1000},
              {"type": "includeActions", "from": "Question::Outro"}
            ]}
        ],
        "secondaryKeywords": [
          "Auftragsnummer"
        ]
      },
      "Insurance::Dis": {
        "actions": [
          {"type": "varSet", "var": "topic", "value": "Handyversicherung"},
          {"type": "track", "name": "bundle_Insurance::Dis", "meta": {"Eingabe": {"$var": "lastRecognize"}}},
          {"type": "switch", "matchMode": "first", "cases": [
              {"condition": {"client.siteId": {"$in": ["Gemischte_EL", "EL", "PSS", "PLA", "GLP" ]}}, "actions": [
                  {"type": "includeActions", "from": "Insurance::EL"}
                ]},
              {"condition": {"client.siteId": {"$in": ["OS", "AS", "AS_ReduzierteAS"]}}, "actions": [
                  {"type": "includeActions", "from": "Insurance::OS"}
                ]},
              {"condition": {"client.siteId": {"$in": ["DS", "KB_3rd_view", "CB"]}}, "actions": [
                  {"type": "includeActions", "from": "Insurance::Aftersales"}
                ]}
            ], "defaultActions": [
              {"type": "includeActions", "from": "Fallback::Support"}
            ]}
        ],
        "labels": [
          "bundle.newmodel::insurance"
        ],
        "refKeywords": [
          "Handyversicherung"
        ],
        "keywords": [
          "Handyversicherung"
        ]
      }
    };
  }
}
