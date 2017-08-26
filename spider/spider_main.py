# -*- coding: UTF-8 -*-

import url_manager, html_downloader, html_output, html_parser

class SpiderMain(object):
    def __init__(self):
        self.url = url_manager.UrlManager()
        self.downloader = html_downloader.HtmlDownloader()
        self.outputer = html_output.HtmlOutput()
        self.parser = html_parser.HtmlParser()

    def craw(self,rootUrl):
        count = 1
        self.url.add_new_url(rootUrl)
        while self.url.has_new_url():
            try:
                new_url = self.url.get_new_url();
                html_cont = self.downloader.download(new_url)
                print 'craw %d:%s' %(count,new_url)
                new_urls,new_data = self.parser.parse(new_url,html_cont)
                self.url.add_new_urls(new_urls)
                self.outputer.append_data(new_data)
            except:
                print "craw failed!"

            if count == 1000:
                break
            count += 1
        self.outputer.output_html()



if __name__ == "__main__":
    rootUrl = "https://baike.baidu.com/item/%E6%96%B0%E7%96%86/132263"
    spider = SpiderMain()
    spider.craw(rootUrl)