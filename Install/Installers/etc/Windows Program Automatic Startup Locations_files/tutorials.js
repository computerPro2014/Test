var google_adnum=0;function google_ad_request_done(google_ads){var s='';var i;if(google_ads.length==0){return;}
if(google_ads.length==1){if(bc_ad_unit=='banner'){s+='<div style="color: black;font-weight: normal;font-size: 12px; padding-bottom: 10px;"><a href=\"'+ google_info.feedback_url+'\">Ads by Google</a></div>';s+='<a href="'+ google_ads[0].url+'" onmouseout="window.status=\'\'" onmouseover="window.status=\'go to '+
google_ads[0].visible_url+'\';return true"><span style="font-size: 14px;">'+ google_ads[0].line1+'</span></a> &nbsp;';s+='<span style="font-size: 12px">'+ google_ads[0].line2+' '+ google_ads[0].line3+'</span>&nbsp;&nbsp;';s+='<a href="'+ google_ads[0].url+'" onmouseout="window.status=\'\'" onmouseover="window.status=\'go to '+
google_ads[0].visible_url+'\';return true"><span style="color: #568eea;font-weight: normal;font-size: 12px;">'+ google_ads[0].visible_url+'</span></a>';}else if(bc_ad_unit=='rt'){s+='<span class="a_fu"><a href=\"'+ google_info.feedback_url+'\">Ads by Google</a></span><br><br>';s+='<span class="a_l1"><a href="'+ google_ads[0].url+'" onmouseout="window.status=\'\'" onmouseover="window.status=\'go to '+
google_ads[0].visible_url+'\';return true">'+ google_ads[0].line1+'</a></span> &nbsp;';s+='<span class="a_desc">'+ google_ads[0].line2+'&nbsp;'+ google_ads[0].line3+'</span> ';s+='<span class="a_vu"><a href="'+ google_ads[0].url+'" onmouseout="window.status=\'\'" onmouseover="window.status=\'go to '+
google_ads[0].visible_url+'\';return true">'+ google_ads[0].visible_url+'</a></span> &nbsp;';}else if(bc_ad_unit=='side'){s+='<span class="a_fu"><a href=\"'+ google_info.feedback_url+'\">Ads by Google</a></span><br><br>';s+='<span class="a_l1"><a href="'+ google_ads[0].url+'" onmouseout="window.status=\'\'" onmouseover="window.status=\'go to '+
google_ads[0].visible_url+'\';return true">'+ google_ads[0].line1+'</a></span><br>';s+='<span class="a_desc">'+ google_ads[0].line2+'&nbsp;'+ google_ads[0].line3+'</span> ';s+='<span class="a_vu"><a href="'+ google_ads[0].url+'" onmouseout="window.status=\'\'" onmouseover="window.status=\'go to '+
google_ads[0].visible_url+'\';return true">'+ google_ads[0].visible_url+'</a></span> &nbsp;';}}else if(google_ads.length>1){s+='<span class="a_fu"><a href=\"'+ google_info.feedback_url+'\">Ads by Google</a></span><br><br>'
for(i=0;i<google_ads.length;++i){if(bc_ad_unit='side'){s+='<div style = "width: 200px" class="rt_row"><span class="a_l1"><a href="'+ google_ads[i].url+'" onmouseout="window.status=\'\'" onmouseover="window.status=\'go to '+
google_ads[i].visible_url+'\';return true">'+ google_ads[i].line1+'</a></span><br>';s+='<span class="a_desc">'+ google_ads[i].line2+'&nbsp;'+ google_ads[i].line3+'</span> ';s+='<span class="a_vu"><a href="'+ google_ads[i].url+'" onmouseout="window.status=\'\'" onmouseover="window.status=\'go to '+
google_ads[i].visible_url+'\';return true">'+ google_ads[i].visible_url+'</a></span><br><br>';s+='</div>';}}}
if(google_ads[0].bidtype=="CPC"){google_adnum=google_adnum+ google_ads.length;}
document.write(s);return;}