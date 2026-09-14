import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Code, Copy, Check, Database } from 'lucide-react';

interface GoogleSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  webhookUrl: string;
  setWebhookUrl: (url: string) => void;
}

export const GoogleSheetModal: React.FC<GoogleSheetModalProps> = ({
  isOpen,
  onClose,
  webhookUrl,
  setWebhookUrl,
}) => {
  const [copiedScript, setCopiedScript] = useState(false);

  const sampleAppsScript = `function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var rsvpsSheet = ss.getSheetByName('RSVPs');
    var wishesSheet = ss.getSheetByName('Wishes');
    
    var rsvps = [];
    if (rsvpsSheet && rsvpsSheet.getLastRow() > 1) {
      var rsvpData = rsvpsSheet.getDataRange().getValues();
      for (var i = 1; i < rsvpData.length; i++) {
        rsvps.push({
          timestamp: rsvpData[i][0],
          fullName: rsvpData[i][1],
          phone: rsvpData[i][2],
          email: rsvpData[i][3],
          attending: rsvpData[i][4],
          guestCount: rsvpData[i][5],
          note: rsvpData[i][6]
        });
      }
    }

    var wishes = [];
    if (wishesSheet && wishesSheet.getLastRow() > 1) {
      var wishData = wishesSheet.getDataRange().getValues();
      for (var j = 1; j < wishData.length; j++) {
        wishes.push({
          id: 'sheet-wish-' + j,
          timestamp: wishData[j][0] ? new Date(wishData[j][0]).toLocaleDateString() : 'Recently',
          name: wishData[j][1],
          relationship: wishData[j][2],
          message: wishData[j][3],
          likes: 1
        });
      }
    }

    return ContentService.createTextOutput(JSON.stringify({ rsvps: rsvps, wishes: wishes }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = data.type === 'RSVP' ? 'RSVPs' : 'Wishes';
    var sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      if (data.type === 'RSVP') {
        sheet.appendRow(['Timestamp', 'Full Name', 'Phone', 'Email', 'Attending', 'Guests', 'Dietary/Notes']);
      } else {
        sheet.appendRow(['Timestamp', 'Name', 'Relationship', 'Message']);
      }
    }

    if (data.type === 'RSVP') {
      sheet.appendRow([
        new Date().toLocaleString(),
        data.fullName,
        "'" + data.phone,
        data.email || '',
        data.attending,
        data.guestCount,
        data.note || ''
      ]);
    } else {
      sheet.appendRow([
        new Date().toLocaleString(),
        data.name,
        data.relationship,
        data.message
      ]);
    }

    return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

  const copyScript = () => {
    navigator.clipboard.writeText(sampleAppsScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#1F130E]/80 backdrop-blur-md flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#FDFBF7] rounded-3xl p-6 sm:p-8 border border-[#E5D9CE] shadow-2xl max-w-2xl w-full relative max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E5D9CE]">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-full bg-[#C85A17]/10 text-[#C85A17]">
                <Database className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold text-[#1F130E]">
                  Google Sheet Integration
                </h3>
                <p className="text-xs text-stone-500">Connect Webhook for RSVPs &amp; Wishes</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#F8F4EE] text-stone-500 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Webhook Input */}
          <div className="mb-6">
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              Your Google Apps Script Webhook URL
            </label>
            <input
              type="url"
              placeholder="https://script.google.com/macros/s/.../exec"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-[#F8F4EE] border border-[#E5D9CE] focus:border-[#C85A17] focus:ring-2 focus:ring-[#C85A17]/20 outline-none text-stone-800 text-xs font-mono transition-all"
            />
            <p className="text-[11px] text-stone-500 mt-1">
              Enter your deployed Google Apps Script URL here. All submitted RSVPs and Wishes will automatically sync!
            </p>
          </div>

          {/* Instructions Accordion */}
          <div className="space-y-4 text-xs text-stone-700">
            <h4 className="font-display text-base font-semibold text-[#1F130E] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#C85A17]" />
              How to setup Google Apps Script Webhook:
            </h4>

            <ol className="list-decimal list-inside space-y-2 leading-relaxed">
              <li>Open Google Sheets and create a new spreadsheet titled <b>"Esther &amp; John Wedding Responses"</b>.</li>
              <li>Go to <b>Extensions &gt; Apps Script</b> in the top menu.</li>
              <li>Paste the code snippet below into <code>Code.gs</code>.</li>
              <li>Click <b>Deploy &gt; New deployment</b>, set Type to <b>Web app</b>, select <i>Execute as: Me</i>, and set <i>Who has access: Anyone</i>.</li>
              <li>Copy the generated Web App URL and paste it into the input field above!</li>
            </ol>

            {/* Code Box */}
            <div className="mt-4 relative rounded-2xl bg-[#2C1810] p-4 text-stone-200 font-mono text-[11px] overflow-x-auto">
              <div className="flex justify-between items-center mb-2 pb-2 border-b border-white/10 text-stone-400">
                <span className="flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-[#F97316]" />
                  Google Apps Script (Code.gs)
                </span>
                <button
                  onClick={copyScript}
                  className="px-2.5 py-1 rounded bg-[#C85A17] text-white hover:bg-[#A3430B] transition-colors flex items-center gap-1 text-[10px]"
                >
                  {copiedScript ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copiedScript ? 'Copied!' : 'Copy Script'}
                </button>
              </div>
              <pre className="text-amber-100">{sampleAppsScript}</pre>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-full bg-[#3B1F14] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#C85A17] transition-colors"
            >
              Save &amp; Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
