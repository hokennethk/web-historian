function () {
        archive.isUrlInList("someurl.com", function (is) {
          expect(is);
          done();
        });
      }
